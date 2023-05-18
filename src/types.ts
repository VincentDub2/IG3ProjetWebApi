import { User , Account} from "@prisma/client";

export type UserWithAccounts = User & { accounts: Account[] };



export type OAuthUserInput = {
    email: string;
    name: string;
    provider: string;
    providerAccountId: string;
  };
  
  export type UserInput = {
    email: string;
    hashedPassword: string;
    name: string;
    salt: string;
}


export type SafeUser = {
    id: string;
    email: string;
    name: string;
    accounts: safeAcount;
}
    
type safeAcount = {
    id: string;
    userId     :       String;
    type      :        String;
    provider    :      String;
    providerAccountId : String;
    refresh_token   :  String ;
    access_token   :   String ;
    expires_at   :    Number ;
    token_type   :    String ;
    scope        :    String ;
    id_token    :     String ;
    session_state    :   String ;
}