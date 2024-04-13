export interface ConfigerInterface {
    load(path: string);
    get_config(): any;
};