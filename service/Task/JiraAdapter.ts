import { fetch } from '@tauri-apps/api/http';

export class JiraAdapter implements TaskApiInterface {
    private endpoint: string;
    private password: string | undefined;
    private username: string | undefined;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    async fetchTasks(){
        return fetch('', {
            method: 'GET',
            headers: this._getHeaders()
        }).then(res => res.data)
    }

    async fetchFilters(): Promise<Filter[]>{
        const headers = this._getHeaders();
        return fetch(this.endpoint + '/rest/api/2/filter/favourite', {
            method: 'GET',
            headers
        }).then(res => res.data as Filter[]).catch(e => {
            console.error(e)
            return []
        })
    }

    login({username, password}: Credentials): void {
        this.username = username;
        this.password = password;
    }

    _getAuthHeader(){
        return {
            Authorization: 'Basic ' + btoa(this.username + ':' + this.password)
        }
    }

    _getHeaders(){
        return {
            ...this._getAuthHeader(),
            'Content-Type': 'application/json'
        }
    }

}
