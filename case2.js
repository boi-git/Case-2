function compressData(voltage, energy, current) {
  // Scaling factors to reduce the range of values
  const scale = 0.1;

  // Compressing data
  const compressedVoltage = Math.round(voltage * scale);
  const compressedEnergy = Math.round(energy * scale);
  const compressedCurrent = Math.round(current * scale);

  // Combine compressed data into a single integer
  const compressedData =
    (compressedVoltage << 20) | (compressedEnergy << 10) | compressedCurrent;

  // Convert compressed data to bytes
  const byte1 = compressedData >> 16;
  const byte2 = (compressedData >> 8) & 0xff;
  const byte3 = compressedData & 0xff;

  // Return compressed data as an array of bytes
  return [byte1, byte2, byte3];
}

// Function to decompress data from <= 3 bytes and return JSON format
function decompressData(compressedData) {
  // Extract bytes from the compressed data
  const byte1 = compressedData[0];
  const byte2 = compressedData[1];
  const byte3 = compressedData[2];

  // Combine bytes to reconstruct the compressed integer
  const compressedInteger = (byte1 << 16) | (byte2 << 8) | byte3;

  // Extract compressed values
  const compressedVoltage = compressedInteger >> 20;
  const compressedEnergy = (compressedInteger >> 10) & 0x3ff;
  const compressedCurrent = compressedInteger & 0x3ff;

  // Scaling factors
  const scale = 0.1;

  // Decompress data
  const voltage = compressedVoltage / scale;
  const energy = compressedEnergy / scale;
  const current = compressedCurrent / scale;

  // Return decompressed data as JSON
  return {
    voltage: voltage,
    energy: energy,
    current: current,
  };
}

const data = {
  voltage: 254,
  energy: 1450,
  current: 1580,
};

const compressedData = compressData(data.voltage, data.energy, data.current);
console.log("Compressed Data:", compressedData);

const decompressedData = decompressData(compressedData);
console.log("Decompressed Data:", decompressedData);
