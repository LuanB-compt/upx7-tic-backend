export interface Database {
    connect(): Promise <true | undefined>;
    disconnect(): Promise <true | undefined>;
    get_db(): any;
};