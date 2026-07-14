import React from 'react';
import ReactPDF, { Font } from '@react-pdf/renderer';
import { ProspectusDocument } from './components/Document';
import * as path from 'path';

// Register a fallback Helvetica standard just to be safe, though ReactPDF includes Helvetica by default.
// In a full environment, you would call Font.register() with TTS files.
Font.registerHyphenationCallback(word => [word]); // disable hyphenation for exact control if needed

async function generatePDF() {
  try {
    console.log('Generating Startup Summit 2026 Prospectus PDF...');
    const outputPath = path.resolve(__dirname, '..', 'Startup_Summit_2026_Prospectus.pdf');
    
    await ReactPDF.render(<ProspectusDocument />, outputPath);
    
    console.log(`Success! PDF has been generated at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

generatePDF();
