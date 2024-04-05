import fs from 'fs';
import YAML from 'yaml';

export class Configer{
    private yaml: any;

    constructor(path: string){
        this.load(path);
    };

    public load(path: string){
        let file = fs.readFileSync(path, 'utf8');
        this.yaml = YAML.parse(file);
    };

    public get_yaml(): any {
        return this.yaml;
    };

};
