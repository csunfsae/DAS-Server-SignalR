import cookie from 'javascript-cookies';

export class AuthorizeService {
    _user = null;
    _isAuthenticated = false;
    _isRegistered = false;

    async isAuthenticated() {
        const user = await this.getUser();
        return !!user;
    }

    async isRegistered() {
        return await this.getRegisteredUser();
    }

    async getUser() {

        try {

            if (this._user) {
                return this._user;
            }

            const tokenId = await this.getAccessToken();

            const result = await fetch(`/api/account/google-login?tokenId=${encodeURIComponent(tokenId)}`, {
                method: "Get",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (result.status === 200) {
                this._isAuthenticated = true;
                this._user = result.json();
            }
        } catch (error) {
            this._isAuthenticated = false;
        }

        return this._user;
    }

    async getRegisteredUser() {
        try {
            const tokenId = await this.getAccessToken();

            const result = await fetch(`/api/account/get-registered-user?tokenId=${encodeURIComponent(tokenId)}`, {
                method: "Get",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (result.status === 200) {
                this._isRegistered = true;
            }
        } catch (error) {
            this._isRegistered = false;
        }

        return this._isRegistered
    }

    async getAccessToken() {
        return cookie.load('googleToken');
    }

    async signOut() {
        this._isAuthenticated = false;
        cookie.save('googleToken', "", { path: '/' });
    }

    async signIn(googleData) {
        const result = await fetch(`/api/account/google-login?tokenId=${encodeURIComponent(googleData.tokenId)}`, {
            method: "Get",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })    
        if (result.status === 200) {
            cookie.save('googleToken', googleData.tokenId, { path: '/' });
            return this.success(googleData.tokenId);
        } else {
            return this.error("Unable to authenticate user");
        }
    }

    async register(googleData) {
        const result = await fetch(`/api/account/register?tokenId=${encodeURIComponent(googleData.tokenId)}`, {
            method: "Post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (result.status === 200) {
            cookie.save('googleToken', googleData.tokenId, { path: '/' });
            return this.success(googleData.tokenId);
        } else {
            return this.error("Unable to register user");
        }
    }

    error(message) {
        return { status: AuthenticationResultStatus.Fail, message };
    }

    success(state) {
        return { status: AuthenticationResultStatus.Success, state };
    }
}

const authService = new AuthorizeService();

export default authService;

export const AuthenticationResultStatus = {
    Redirect: 'redirect',
    Success: 'success',
    Fail: 'fail'
};