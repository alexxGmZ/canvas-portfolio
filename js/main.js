import { StaticCanvas, FabricText } from "fabric"

const canvas = new StaticCanvas("canvas");
const helloWorld = new FabricText('Hello world!');
canvas.add(helloWorld);
canvas.centerObject(helloWorld);
