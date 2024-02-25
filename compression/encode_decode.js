import { CharacterFrequencyCounter, HuffmanTree } from './helper.js';

export async function encodeData(filePath, outputDirectory) {
    try {
        // Read file data
        const data = fs.readFileSync(filePath, 'utf-8');

        // Create a characterFrequencyTable
        const frequencyCounter = new CharacterFrequencyCounter(filePath);
        frequencyCounter.calculateCharacterFrequency(data);

        // Create a HuffmanTree instance 
        const huffmanTree = new HuffmanTree(frequencyCounter.charFrequency);

        // Encode the data 
        const encodedText = huffmanTree.encode(data);

        // Create the output file path (assuming same name with .huff extension)
        const outputFileName = `${outputDirectory}/encoded_${Date.now()}.huff`;

        // Serialize frequency Table to include in the header
        const serializedFrequencyTable = frequencyCounter.serializeFrequencyTable();

        // Create header 
        const header = `${serializedFrequencyTable}\n`;

        // Write the header and compressed data to output file 
        fs.writeFileSync(outputFileName, header + encodedText, 'utf-8');
        console.log(`File successfully encoded and saved to: ${outputFileName}`);

    } catch (error) {
        console.log("Error encoding the file: ", error);
    }
}
