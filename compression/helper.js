import fs from "fs"


class CharacterFrequencyCounter {
    constructor(filePath) {
        this.filePath = filePath;
        this.charFrequency = new Map();
    }

    calculateCharacterFrequency(data) {
        try {
            // Calculate character frequencies
            for (let i = 0; i < data.length; i++) {
                const char = data[i];
                // console.log(char);
                // Increment the frequency of the character
                if (this.charFrequency.has(char)) {
                    this.charFrequency.set(char, this.charFrequency.get(char) + 1);
                } else {
                    this.charFrequency.set(char, 1);
                }
            }
        } catch (error) {
            console.error(`Error reading the file: ${error}`);
        }
    }

    serializeFrequencyTable() {
        const serialized = Array.from(this.charFrequency.entries()).map(([char, frequency]) => `${char}:${frequency}`).join(';');
        return serialized;
    }

    static deserializeFrequencyTable(serialized) {
        const entries = serialized.split(';');
        const charFrequency = new Map(entries.map(entry => entry.split(':')));
        return charFrequency;
    }
}



// Hoffman CODE Start HERE

class HuffmanNode {
    constructor(char, frequency) {
        this.char = char;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
}

class HuffmanTree {
    constructor(charFrequency) {
        this.charFrequency = charFrequency;
        this.root = this.buildTree();
        this.encodingMap = this.buildEncodingMap();
    }

    buildTree() {
        const nodes = Array.from(this.charFrequency.entries()).map(([char, frequency]) => new HuffmanNode(char, frequency));

        while (nodes.length > 1) {
            nodes.sort((a, b) => a.frequency - b.frequency);
            const left = nodes.shift();
            const right = nodes.shift();
            const parent = new HuffmanNode(null, left.frequency + right.frequency);
            parent.left = left;
            parent.right = right;
            nodes.push(parent);
        }

        return nodes[0];
    }

    buildEncodingMap() {
        const encodingMap = {};
        const traverse = (node, code = '') => {
            if (node.char !== null) {
                encodingMap[node.char] = code;
            } else {
                if (node.left) traverse(node.left, code + '0');
                if (node.right) traverse(node.right, code + '1');
            }
        };
        traverse(this.root);
        return encodingMap;
    }

    encode(text) {
        return text.split('').map(char => this.encodingMap[char]).join('');
    }

    decode(encodedText) {
        let decodeText = '';
        let current = this.root;
        for (const bit of encodedText) {
            current = bit === '0' ? current.left : current.right;
            if (current.char !== null) {
                decodeText += current.char;
                current = this.root;
            }
        }
        return decodeText;
    }

}

export { CharacterFrequencyCounter, HuffmanNode, HuffmanTree };
