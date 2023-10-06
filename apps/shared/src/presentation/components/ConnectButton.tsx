import { ConnectButton } from '@rainbow-me/rainbowkit';
import "./ConnectButton.css";

export const CustomConnectButton = () => {
    return (
        <ConnectButton.Custom>
            {({
                account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected = ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                        className={'connect-button-wrapper ' + (connected ? 'connected ' : 'disconnected ') + (chain?.unsupported ? 'unsupported ' : '')}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button className="connect-button" onClick={openConnectModal} type="button">
                                        Connect Wallet
                                    </button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }
                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        type="button"
                                    >
                                        <div
                                            style={{
                                                background: chain.iconBackground,
                                                width: "calc(var(--chakra-sizes-10) - var(--chain-icon-margin))",
                                                height: "calc(var(--chakra-sizes-10) - var(--chain-icon-margin))",
                                                borderRadius: "calc( (var(--chakra-sizes-10))/2)",
                                                overflow: 'hidden',
                                                marginRight: 4,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'var(--chakra-colors-brand-500)',
                                                color:'var(--chakra-colors-brand-900)',
                                                margin: "var(--chain-icon-margin) 0px",
                                                border: "1px solid var(--chakra-colors-brand-1200)",
                                            }}
                                        >
                                            {
                                                chain.hasIcon ? 
                                                (
                                                    chain.iconUrl ? 
                                                    (
                                                        <img
                                                            alt={chain.name ?? 'Chain icon'}
                                                            src={chain.iconUrl}
                                                            style={{ width: "calc(var(--chakra-sizes-10) - var(--chain-icon-margin))", height: "calc(var(--chakra-sizes-10) -var(--chain-icon-margin))" }} />
                                                        ) :
                                                        (
                                                            <></>
                                                        )
                                                ):
                                                (
                                                    <>
                                                        {((chain?.name?.length ?? 0) > 0) ? chain!.name![0] : ""}
                                                    </>
                                                )
                                            }
                                        </div>
                                    </button>
                                    <button onClick={openAccountModal} type="button">
                                        {account.displayName}
                                        {/* {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ''} */}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            } }
        </ConnectButton.Custom>
    );
};
