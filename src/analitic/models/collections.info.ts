export interface ICollectionsInfo {
    'ns': string;
    'size': number;
    'count': number;
    'storageSize': number;
    'capped': boolean;
    'nindexes': number;
    'indexBuilds': any;
    'scaleFactor': number;
    'ok': number;
}
