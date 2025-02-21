'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';

interface ButtonProps {
    onClick: () => void;
    text: string;
    variant?: 'default' | 'error' | 'network';
    showStatus?: boolean;
    isConnected?: boolean;
}

interface ConnectButtonCProps {
    displayType?: 'full' | 'compact';
}

const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}…${address.slice(-4)}`;
};

export const ConnectButtonC = ({ displayType = 'full' }: ConnectButtonCProps) => {
    const Button = ({ onClick, text, variant = 'default', showStatus, isConnected }: ButtonProps) => {
        if (variant === 'network') {
            return (
                <button 
                    onClick={onClick} 
                    type="button" 
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-md font-medium transition-all duration-300 hover:bg-violet-500/20 gap-2"
                >
                    {showStatus && (
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                    )}
                    <span className="truncate">{text}</span>
                </button>
            );
        }

        return (
            <button 
                onClick={onClick} 
                type="button" 
                className={`
                    h-9 font-semibold text-md rounded-lg
                    ${variant === 'error' 
                        ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    }
                    text-white hover:shadow-md transition-all duration-200
                    ${variant === 'error' 
                        ? 'hover:shadow-red-500/25' 
                        : 'hover:shadow-purple-500/25'
                    }
                    flex items-center justify-center gap-2
                    ${displayType === 'compact' ? 'px-3 min-w-[120px]' : 'px-4 min-w-[144px]'}
                `}
            >
                {showStatus && (
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
                )}
                <span className="truncate">{text}</span>
            </button>
        );
    };

    return (
        <div>
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openConnectModal,
                    openChainModal,
                    mounted,
                }) => {
                    const ready = mounted;
                    const connected = ready && account && chain;

                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                style: {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                            className="flex items-center gap-2"
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <Button 
                                            onClick={openConnectModal} 
                                            text={displayType === 'compact' ? 'Connect' : 'Connect Wallet'}
                                            showStatus={true}
                                            isConnected={false}
                                        />
                                    );
                                }

                                if (chain.unsupported) {
                                    return (
                                        <Button 
                                            onClick={openChainModal} 
                                            text="Wrong Network"
                                            variant="error"
                                        />
                                    );
                                }

                                return (
                                    <div className="flex items-center gap-2">
                                        {displayType === 'full' && (
                                            <Button 
                                                onClick={openChainModal}
                                                text={chain.name || ""}
                                                variant="network"
                                                showStatus={true}
                                                isConnected={true}
                                            />
                                        )}
                                        <Button 
                                            onClick={openAccountModal}
                                            text={account.address ? formatAddress(account.address) : ''}
                                        />
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    );
};