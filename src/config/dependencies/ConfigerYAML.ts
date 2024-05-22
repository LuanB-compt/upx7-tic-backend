import fs from 'fs';
import YAML from 'yaml';
import { ConfigerInterface } from '../../interface/configer/Interface';

export class ConfigerYAML implements ConfigerInterface {
    private yaml: any;

    constructor(path: string){
        this.yaml = undefined;
        this.load(path);
    };

    public load(path: string){
        let file = fs.readFileSync(path, 'utf8');
        this.yaml = YAML.parse(file);
    };

    public get_config(): any {
        return this.yaml;
    };

};