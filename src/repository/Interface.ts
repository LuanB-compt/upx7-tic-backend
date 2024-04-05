export interface Repository {
    sync(): any ;
    read(): Promise <any[] | undefined>;
    readByID(id: number): Promise<any | undefined>;
    create(data: any): Promise <any | undefined>;
    update(id: number, data: any): Promise <any | undefined>;
    delete(id: number): Promise <any | undefined>;
};