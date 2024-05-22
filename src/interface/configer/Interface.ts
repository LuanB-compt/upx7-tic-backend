export interface ConfigerInterface {
    load(path: string): any;
    get_config(): any;
};