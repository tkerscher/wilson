import { Graph } from "../model/graph";
import { Reader, Writer } from "protobufjs/index";

export function openPlot(graphs: Graph[], filter?: string): void {
    //encode graphs and pack into blob
    const dataWriter = Writer.create();
    const lenWriter = Writer.create();
    lenWriter.uint32(graphs.length);
    let lastLen = 0;
    graphs.forEach(g => {
        Graph.encode(g, dataWriter);
        lenWriter.uint32(dataWriter.len - lastLen);
        lastLen = dataWriter.len;
    });
    const blob = new Blob([lenWriter.finish(), dataWriter.finish()]);
    //create a url to pass and escape it
    const url = encodeURIComponent(window.URL.createObjectURL(blob));

    //open plot page and pass data uri
    let link = `plot.html?data=${url}`;
    //add filter if present
    if (filter)
        link += "&filter=" + encodeURIComponent(filter);

    window.open(link);
}

export async function extractGraphs(): Promise<Graph[]> {
    //get blob uri
    const params = new URLSearchParams(window.location.search);
    const dataUri = params.get("data");
    if (!dataUri)
        return []; //no data passed
    const decodedUri = decodeURIComponent(dataUri);

    //fetch blob
    const blob = await fetch(decodedUri).then(res => res.blob());
    const data = new Uint8Array(await blob.arrayBuffer());
    const reader = new Reader(data);

    //read number of graphs
    const count = reader.uint32();
    //read lengths of graphs
    const lens = Array.from({ length: count }, () => reader.uint32());
    //read graphs
    const graphs = lens.map(l => Graph.decode(reader, l));

    //revoke uri
    window.URL.revokeObjectURL(decodedUri);

    //Done
    return graphs;
}
