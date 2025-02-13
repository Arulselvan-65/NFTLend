import React from 'react';
import { Play, Shield, Zap, ChevronRight, ArrowUpRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="overflow-hidden bg-[#030014] relative min-h-screen">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-radial from-violet-600/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-radial from-blue-600/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-fuchsia-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>

      <div className="relative z-10">
        <div className="flex flex-col items-center justify-start min-h-screen px-4 md:px-8 lg:px-16 pt-8 md:pt-0">
          <div className="text-center mb-4 md:mb-8 mt-8 md:mt-16">
            <h2 className="text-6xl md:text-8xl font-bold tracking-wider text-transparent bg-clip-text 
              bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 px-2 animate-gradient">
              NFTLend
            </h2>
          </div>

          <div className="text-center mt-8 md:mt-16 px-2">
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 md:mb-8 leading-tight">
              <span className="text-white">Unlock the Power of</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500">
                NFT Finance
              </span>
            </h1>
            <p className="text-gray-300 mb-8 md:mb-12 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Experience the future of NFT lending with institutional-grade security,
              and lightning-fast liquidity.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="group relative bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-4 
                rounded-full font-semibold shadow-xl hover:shadow-fuchsia-500/30 
                transform hover:scale-105 transition-all duration-300 text-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative flex items-center">
                  Launch App
                  <Play className="ml-2 w-5 h-5" />
                </div>
              </button>
              <button className="relative overflow-hidden border-2 border-fuchsia-500/20 text-white px-8 py-4 
                rounded-full font-semibold hover:bg-fuchsia-500/10 
                transform hover:scale-105 transition-all duration-300 text-lg group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center">
                  Read Docs
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>


          <div className="mt-24 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
            {[
              { value: "$250M+", label: "Total Volume"},
              { value: "35K+", label: "Active Users"},
              { value: "75K+", label: "NFTs Locked"},
              { value: "100%", label: "Secure"}
            ].map((stat, index) => (
              <div key={index} className="group bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30
                hover:border-violet-500/30 transition-all duration-300 hover:bg-gray-800/40">
                <div className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text 
                  bg-gradient-to-r from-violet-500 to-fuchsia-500">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium mb-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                color: "from-violet-600 to-fuchsia-600",
                title: "Instant Liquidity",
                desc: "Get immediate loans backed by your valuable NFT collections."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                color: "from-fuchsia-600 to-blue-600",
                title: "Secure Vaults",
                desc: "Your NFTs are safely stored in audited smart contracts."
              },
              {
                icon: <ArrowUpRight className="w-8 h-8" />,
                color: "from-blue-600 to-cyan-600",
                title: "Flash Loans",
                desc: "Access instant liquidity with our flash loan feature."
              }
            ].map((feature, index) => (
              <div key={index}
                className="group bg-gray-800/20 backdrop-blur-xl p-8 rounded-2xl transform hover:scale-105 
                transition-all duration-300 border border-gray-700/30 hover:border-violet-500/30">
                <div className="bg-gradient-to-r w-16 h-16 rounded-xl flex items-center justify-center mb-6
                  text-white p-3" style={{ backgroundImage: `linear-gradient(to right, ${feature.color})` }}>
                  {feature.icon}
                </div>
                <h2 className="font-bold mb-4 text-2xl text-white group-hover:text-transparent 
                  group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-500 
                  group-hover:to-fuchsia-500 transition-all duration-300">
                  {feature.title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>


          <div className="mt-24 mb-20 text-center max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text 
              bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500">
              Ready to Transform Your NFT Portfolio?
            </h2>
            <p className="text-gray-300 text-xl leading-relaxed mb-12">
              Join thousands of NFT collectors and investors who trust NFTLend Pro
              for their DeFi needs. Experience the most advanced NFT lending platform today.
            </p>
            <button className="group relative bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-12 py-5 
              rounded-full font-semibold shadow-xl hover:shadow-fuchsia-500/30 
              transform hover:scale-105 transition-all duration-300 text-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative flex items-center">
                Start Lending
                <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}