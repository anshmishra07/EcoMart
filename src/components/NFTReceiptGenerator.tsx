import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { CheckCircle, Download, Share2, QrCode, Smartphone, Shield, Zap, Globe } from 'lucide-react';

// Polygon smart contract simulation
interface ReceiptNFT {
  orderId: string;
  metadataHash: string;
  customer: string;
  timestamp: number;
  sustainabilityScore: number;
  carbonSaved: number;
}

class PolygonNFTContract {
  private static instance: PolygonNFTContract;
  private receipts: Map<string, ReceiptNFT> = new Map();
  
  static getInstance(): PolygonNFTContract {
    if (!PolygonNFTContract.instance) {
      PolygonNFTContract.instance = new PolygonNFTContract();
    }
    return PolygonNFTContract.instance;
  }
  
  async mintReceipt(orderData: {
    items: CartItem[];
    totalAmount: number;
    customer: string;
  }): Promise<{ tokenId: string; transactionHash: string; ipfsHash: string }> {
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const tokenId = 'NFT#' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const transactionHash = '0x' + Math.random().toString(16).substr(2, 64);
    
    // Create metadata for IPFS storage
    const metadata = {
      name: `EcoMart Receipt ${tokenId}`,
      description: 'Tamper-proof digital receipt with sustainability tracking',
      image: this.generateQRCode(tokenId),
      attributes: [
        { trait_type: 'Total Amount', value: orderData.totalAmount },
        { trait_type: 'Items Count', value: orderData.items.length },
        { trait_type: 'Carbon Saved', value: orderData.items.reduce((sum, item) => sum + item.product.carbonSaved * item.quantity, 0) },
        { trait_type: 'Eco Score', value: orderData.items.reduce((sum, item) => sum + item.product.sustainabilityScore, 0) / orderData.items.length }
      ],
      properties: {
        items: orderData.items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          sustainabilityScore: item.product.sustainabilityScore,
          carbonSaved: item.product.carbonSaved
        })),
        warranty: '2 years manufacturer warranty',
        returnPolicy: '30-day return guarantee',
        blockchain: 'Polygon',
        timestamp: Date.now()
      }
    };
    
    // Simulate IPFS hash
    const ipfsHash = 'Qm' + Math.random().toString(36).substr(2, 44);
    
    // Store receipt NFT
    const receipt: ReceiptNFT = {
      orderId: tokenId,
      metadataHash: ipfsHash,
      customer: orderData.customer,
      timestamp: Date.now(),
      sustainabilityScore: metadata.attributes[3].value as number,
      carbonSaved: metadata.attributes[2].value as number
    };
    
    this.receipts.set(tokenId, receipt);
    
    return { tokenId, transactionHash, ipfsHash };
  }
  
  private generateQRCode(tokenId: string): string {
    // In production, this would generate an actual QR code
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="100" text-anchor="middle" font-family="monospace" font-size="12">${tokenId}</text>
      </svg>
    `)}`;
  }
  
  async verifyReceipt(tokenId: string): Promise<ReceiptNFT | null> {
    return this.receipts.get(tokenId) || null;
  }
}

interface NFTReceiptGeneratorProps {
  items: CartItem[];
  totalAmount: number;
  onClose: () => void;
}

const NFTReceiptGenerator: React.FC<NFTReceiptGeneratorProps> = ({ items, totalAmount, onClose }) => {
  const [stage, setStage] = useState<'generating' | 'ipfs' | 'minting' | 'complete'>('generating');
  const [progress, setProgress] = useState(0);
  const [transactionHash, setTransactionHash] = useState('');
  const [nftId, setNftId] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [gasUsed, setGasUsed] = useState('');
  const [blockNumber, setBlockNumber] = useState('');
  
  const contract = PolygonNFTContract.getInstance();

  useEffect(() => {
    const generateNFT = async () => {
      // Simulate NFT generation process
      const stages = [
        { name: 'Generating metadata...', duration: 800 },
        { name: 'Uploading to IPFS...', duration: 1200 },
        { name: 'Creating smart contract...', duration: 1000 },
        { name: 'Broadcasting to Polygon...', duration: 1500 },
        { name: 'Confirming transaction...', duration: 800 }
      ];

      for (let i = 0; i < stages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, stages[i].duration));
        setProgress(((i + 1) / stages.length) * 100);
        
        if (i === 1) setStage('ipfs');
        if (i === 2) setStage('minting');
      }

      // Mint NFT using smart contract
      try {
        const result = await contract.mintReceipt({
          items,
          totalAmount,
          customer: 'user@example.com'
        });
        
        setTransactionHash(result.transactionHash);
        setNftId(result.tokenId);
        setIpfsHash(result.ipfsHash);
        setGasUsed((Math.random() * 0.01 + 0.005).toFixed(6));
        setBlockNumber((Math.floor(Math.random() * 1000000) + 45000000).toString());
        
      } catch (error) {
        console.error('NFT minting failed:', error);
      }
      
      setTimeout(() => setStage('complete'), 2000);
    };

    generateNFT();
  }, []);

  const totalCarbonSaved = items.reduce((sum, item) => sum + (item.product.carbonSaved * item.quantity), 0);
  const ecoScore = items.reduce((sum, item) => sum + item.product.sustainabilityScore, 0) / items.length;

  const renderStage = () => {
    switch (stage) {
      case 'generating':
        return (
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <Smartphone className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center animate-bounce">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Generating NFT Receipt ⚡
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Creating tamper-proof digital receipt on Polygon blockchain...
              </p>
            </div>
            
            <div className="w-full max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">{progress.toFixed(0)}% complete</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
              <div className="text-center">
                <Shield className="w-4 h-4 mx-auto mb-1" />
                <div>Secure</div>
              </div>
              <div className="text-center">
                <Globe className="w-4 h-4 mx-auto mb-1" />
                <div>Decentralized</div>
              </div>
              <div className="text-center">
                <QrCode className="w-4 h-4 mx-auto mb-1" />
                <div>Verifiable</div>
              </div>
            </div>
          </div>
        );

      case 'ipfs':
        return (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Globe className="w-12 h-12 text-white" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Storing on IPFS 🌐
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Uploading metadata to InterPlanetary File System for permanent storage...
              </p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-gray-600 mb-2">IPFS Hash:</p>
              <p className="text-xs font-mono bg-white p-2 rounded border">
                Qm{Math.random().toString(36).substr(2, 20)}...
              </p>
            </div>
          </div>
        );

      case 'minting':
        return (
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto animate-spin">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Minting on Polygon ⛽
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Smart contract executing on Polygon network...
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-gray-600 mb-2">Transaction Hash:</p>
                <p className="text-xs font-mono bg-white p-2 rounded border">
                  {transactionHash.slice(0, 20)}...
                </p>
              </div>
              
              <div className="flex justify-center space-x-4 text-xs text-gray-500">
                <div>Network: Polygon</div>
                <div>Gas: ~0.001 MATIC</div>
                <div>Confirmations: 1/3</div>
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white text-xs">✨</span>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                NFT Receipt Minted! 🎉
              </h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Your purchase is now secured on Polygon blockchain with tamper-proof verification.
              </p>
            </div>

            {/* NFT Receipt Card */}
            <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-2xl p-6 max-w-md mx-auto border-2 border-purple-200 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{nftId}</h3>
                <p className="text-sm text-gray-600">Polygon NFT Receipt</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbon Saved</span>
                  <span className="font-semibold text-green-600">{totalCarbonSaved.toFixed(1)}kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Eco Score</span>
                  <span className="font-semibold text-blue-600">{ecoScore.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Blockchain</span>
                  <span className="font-semibold text-purple-600">Polygon PoS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gas Used</span>
                  <span className="font-semibold">{gasUsed} MATIC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Block</span>
                  <span className="font-semibold">#{blockNumber}</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-white/50 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">Transaction Hash:</p>
                <p className="text-xs font-mono break-all">{transactionHash}</p>
                <p className="text-xs text-gray-600 mt-2">IPFS Hash:</p>
                <p className="text-xs font-mono break-all">{ipfsHash}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download NFT</span>
              </button>
              
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Share Receipt</span>
              </button>
            </div>

            {/* Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/50">
              <h4 className="font-semibold text-gray-800 mb-4">Your NFT Receipt includes:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Immutable purchase verification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Smart contract warranty tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>QR code instant verification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Carbon footprint certification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>IPFS permanent storage</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105"
              >
                Continue Shopping 🛍️
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/30">
          {renderStage()}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔗 Secured by Polygon • 📁 Stored on IPFS • ⚡ Low gas fees • 🌱 Carbon neutral
          </p>
        </div>
      </div>
    </div>
  );
};

export default NFTReceiptGenerator;