// Importer les dépendances nécessaires
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github";
import { User , Account} from "@prisma/client";

// Importer les fonctions nécessaires depuis le service utilisateur
import { createOAuthUser, getUserByProviderAccountId, getUserById } from "../services/user.service";

// Utiliser la stratégie Google OAuth2.0 pour Passport
passport.use(
  new GoogleStrategy(
    {
      // Configurer les identifiants et l'URL de rappel
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    // La fonction de vérification est appelée après l'authentification réussie
    async (_accessToken, _refreshToken, profile, done) => {

      // Récupérer l'utilisateur par l'ID du compte Google
      let user = await getUserByProviderAccountId("google", profile.id);
      
      // Si l'utilisateur n'existe pas, en créer un nouveau
      if (!user) {
        user = await createOAuthUser({
          provider: "google",
          providerAccountId: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
        });
      }

      // Continuer avec l'utilisateur récupéré ou créé
      return done(null, user);
    }
  )
);

// Utiliser la stratégie GitHub OAuth pour Passport
passport.use(
  new GithubStrategy(
    {
      // Configurer les identifiants et l'URL de rappel
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "/auth/github/callback",
    },
    // La fonction de vérification est appelée après l'authentification réussie
    async (_accessToken, _refreshToken, profile, done) => {
      // Récupérer l'utilisateur par l'ID du compte GitHub

      let user = await getUserByProviderAccountId("github", profile.id);

      // Si l'utilisateur n'existe pas, en créer un nouveau
      if (!user) {
        user = await createOAuthUser({
          provider: "github",
          providerAccountId: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
        });
      }

      // Continuer avec l'utilisateur récupéré ou créé
      return done(null, user);
    }
  )
);

// Sérialiser l'utilisateur pour le stocker dans la session
passport.serializeUser((user : User, done) => {
  done(null, user.id);
});

// Désérialiser l'utilisateur à partir de l'ID stocké dans la session
passport.deserializeUser(async (id : string, done) => {

  if (!id) {
    return done(null, null);
  }

  const user = await getUserById(id);
  done(null, user);
});

// Exporter l'instance Passport configurée
export default passport;
