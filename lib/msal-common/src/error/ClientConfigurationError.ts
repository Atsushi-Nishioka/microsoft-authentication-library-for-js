/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ClientAuthError } from "./ClientAuthError";

/**
 * ClientConfigurationErrorMessage class containing string constants used by error codes and messages.
 */
export const ClientConfigurationErrorMessage = {
    redirectUriNotSet: {
        code: "redirect_uri_empty",
        desc: "A redirect URI is required for all calls, and none has been set."
    },
    postLogoutUriNotSet: {
        code: "post_logout_uri_empty",
        desc: "A post logout redirect has not been set."
    },
    claimsRequestParsingError: {
        code: "claims_request_parsing_error",
        desc: "Could not parse the given claims request object."
    },
    authorityUriInsecure: {
        code: "authority_uri_insecure",
        desc: "Authority URIs must use https.  Please see here for valid authority configuration options: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications#configuration-options"
    },
    urlParseError: {
        code: "url_parse_error",
        desc: "URL could not be parsed into appropriate segments."
    },
    urlEmptyError: {
        code: "empty_url_error",
        desc: "URL was empty or null."
    },
    emptyScopesError: {
        code: "empty_input_scopes_error",
        desc: "Scopes cannot be passed as null, undefined or empty array because they are required to obtain an access token."
    },
    nonArrayScopesError: {
        code: "nonarray_input_scopes_error",
        desc: "Scopes cannot be passed as non-array."
    },
    clientIdSingleScopeError: {
        code: "clientid_input_scopes_error",
        desc: "Client ID can only be provided as a single scope."
    },
    invalidPrompt: {
        code: "invalid_prompt_value",
        desc: "Supported prompt values are 'login', 'select_account', 'consent' and 'none'.  Please see here for valid configuration options: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications#configuration-options",
    },
    tokenRequestEmptyError: {
        code: "token_request_empty",
        desc: "Token request was empty and not found in cache."
    },
    invalidCodeChallengeMethod: {
        code: "invalid_code_challenge_method",
        desc: "code_challenge_method passed is invalid. Valid values are \"plain\" and \"S256\"."
    },
    invalidCodeChallengeParams: {
        code: "one_of_code_challenge_code_challenge_method_params_missing",
        desc: "Both params: code_challenge and code_challenge_method are to be passed if to be sent in the request"
    },
    b2cKnownAuthoritiesNotSet: {
        code: "b2c_known_authorities_not_set",
        desc: "Must set known authorities when validateAuthority is set to True and using B2C"
    },
    untrustedAuthority: {
        code: "untrusted_authority",
        desc: "The provided authority is not a trusted authority. If using B2C, please include this authority in the knownAuthorities config parameter."
    }
};

/**
 * Error thrown when there is an error in configuration of the MSAL.js library.
 */
export class ClientConfigurationError extends ClientAuthError {

    constructor(errorCode: string, errorMessage?: string) {
        super(errorCode, errorMessage);
        this.name = "ClientConfigurationError";
        Object.setPrototypeOf(this, ClientConfigurationError.prototype);
    }

    /**
     * Creates an error thrown when the redirect uri is empty (not set by caller)
     */
    static createRedirectUriEmptyError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.redirectUriNotSet.code,
            ClientConfigurationErrorMessage.redirectUriNotSet.desc);
    }

    /**
     * Creates an error thrown when the post-logout redirect uri is empty (not set by caller)
     */
    static createPostLogoutRedirectUriEmptyError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.postLogoutUriNotSet.code,
            ClientConfigurationErrorMessage.postLogoutUriNotSet.desc);
    }

    /**
     * Creates an error thrown when the claims request could not be successfully parsed
     */
    static createClaimsRequestParsingError(claimsRequestParseError: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.claimsRequestParsingError.code,
            `${ClientConfigurationErrorMessage.claimsRequestParsingError.desc} Given value: ${claimsRequestParseError}`);
    }

    /**
     * Creates an error thrown if authority uri is given an insecure protocol.
     * @param urlString
     */
    static createInsecureAuthorityUriError(urlString: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.authorityUriInsecure.code,
            `${ClientConfigurationErrorMessage.authorityUriInsecure.desc} Given URI: ${urlString}`);
    }

    /**
     * Creates an error thrown if URL string does not parse into separate segments.
     * @param urlString
     */
    static createUrlParseError(urlParseError: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.urlParseError.code,
            `${ClientConfigurationErrorMessage.urlParseError.desc} Given Error: ${urlParseError}`);
    }

    /**
     * Creates an error thrown if URL string is empty or null.
     * @param urlString
     */
    static createUrlEmptyError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.urlEmptyError.code,
            ClientConfigurationErrorMessage.urlEmptyError.desc);
    }

    /**
     * Error thrown when scopes are not an array
     * @param inputScopes
     */
    static createScopesNonArrayError(inputScopes: Array<string>): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.nonArrayScopesError.code,
            `${ClientConfigurationErrorMessage.nonArrayScopesError.desc} Given Scopes: ${inputScopes}`);
    }

    /**
     * Error thrown when scopes are empty.
     * @param scopesValue
     */
    static createEmptyScopesArrayError(inputScopes: Array<string>): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.emptyScopesError.code,
            `${ClientConfigurationErrorMessage.emptyScopesError.desc} Given Scopes: ${inputScopes}`);
    }

    /**
     * Error thrown when client id scope is not provided as single scope.
     * @param inputScopes
     */
    static createClientIdSingleScopeError(inputScopes: Array<string>): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.clientIdSingleScopeError.code,
            `${ClientConfigurationErrorMessage.clientIdSingleScopeError.desc} Given Scopes: ${inputScopes}`);
    }

    /**
     * Error thrown when prompt is not an allowed type.
     * @param promptValue
     */
    static createInvalidPromptError(promptValue: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidPrompt.code,
            `${ClientConfigurationErrorMessage.invalidPrompt.desc} Given value: ${promptValue}`);
    }

    /**
     * Throws error when token request is empty and nothing cached in storage.
     */
    static createEmptyTokenRequestError(): ClientConfigurationError {
        return new ClientConfigurationError(
            ClientConfigurationErrorMessage.tokenRequestEmptyError.code,
            ClientConfigurationErrorMessage.tokenRequestEmptyError.desc
        );
    }

    /**
     * Throws error when an invalid code_challenge_method is passed by the user
     */
    static createInvalidCodeChallengeMethodError(): ClientConfigurationError {
        return new ClientConfigurationError(
            ClientConfigurationErrorMessage.invalidCodeChallengeMethod.code,
            ClientConfigurationErrorMessage.invalidCodeChallengeMethod.desc
        );
    }

    /**
     * Throws error when both params: code_challenge and code_challenge_method are not passed together
     */
    static createInvalidCodeChallengeParamsError(): ClientConfigurationError {
        return new ClientConfigurationError(
            ClientConfigurationErrorMessage.invalidCodeChallengeParams.code,
            ClientConfigurationErrorMessage.invalidCodeChallengeParams.desc
        );
    }

    /**
     * Throws an error when the user passes B2C authority and does not set knownAuthorities
     */
    static createKnownAuthoritiesNotSetError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.b2cKnownAuthoritiesNotSet.code,
            ClientConfigurationErrorMessage.b2cKnownAuthoritiesNotSet.desc);
    }

    /**
     * Throws error when provided authority is not a member of the trusted host list
     */
    static createUntrustedAuthorityError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.untrustedAuthority.code,
            ClientConfigurationErrorMessage.untrustedAuthority.desc);
    }
}
