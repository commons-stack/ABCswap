import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Link,
    VStack,
    Button,
    Heading,
    useDisclosure,
    List,
    ListItem,
    UnorderedList,
} from '@chakra-ui/react';

export default function TermsModal() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Link onClick={onOpen}><Text as="u">Terms of Service</Text></Link>

            <Modal size={'5xl'} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent border="1px solid black" borderRadius="16px">
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack m="5%" color="brand.900" spacing={5} alignItems="flex-start">
                            <Heading>Terms of Service</Heading>
                            <Text>
                                These Terms of Service govern the access and use of the following Services (our “Services”):
                            </Text>
                            <UnorderedList>
                                <ListItem>ABC Launch 	https://launch.abcswap.xyz</ListItem>
                                <ListItem>ABC Swap 	https://abcswap.xyz</ListItem>
                            </UnorderedList>
                            <Text>
                                ABC Launch and ABC Swap, operated by ABC Labs - Association (“We” or “Us”), and other services we provide to you.
                            </Text>
                            <Text>
                                By accessing or using our Services, you agree to be bound by the following Terms of Service (the "Terms"). Please read them carefully before participating. If you do not agree with any of the provisions stated herein, you should not use our Services or participate in any associated initiatives.
                            </Text>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                1. Services
                            </Heading>
                            <Heading fontSize="32px" fontWeight={500} color="brand.900">
                                ABC Launch
                            </Heading>

                            <Text>The ABC Launch is an online platform that allows users to create, manage, and interact with augmented bonding curves. An Augmented Bonding Curve is a mathematical model implemented through a smart contract on a blockchain, which automates the pricing and exchange of digital tokens.</Text>
                            <Text>Through the ABC Launch, users can:</Text>
                            <List>
                                <ListItem>a) Create their own Augmented Bonding Curves with customizable parameters</ListItem>
                                <ListItem>b) Create a new DAO with an Augmented Bonding Curve</ListItem>
                                <ListItem>c) Create a DAO vote to attach an Augmented Bonding Curve to an existing DAO</ListItem>
                            </List>
                            <Text>While the ABC Launch offers the tools to facilitate these activities, it is your responsibility to understand the associated risks and implications of creating or participating in an Augmented Bonding Curve.</Text>
                            <Heading fontSize="32px" fontWeight={500} color="brand.900">
                                ABC Swap
                            </Heading>
                            <Text>
                                The ABC Swap is designed to facilitate the swapping of tokens launched and governed by Augmented Bonding Curves ("ABC Tokens"). The primary functions and offerings of ABC Swap include but are not limited to:
                            </Text>
                            <List>
                                <ListItem>a) Swapping ABC Tokens: Users can swap an ABC Token against the reserve currency of that ABC or other tokens.</ListItem>
                                <ListItem>b) Wallet integration: ABC Swap supports direct integration with blockchain wallets, allowing users to manage and execute transactions seamlessly.</ListItem>
                            </List>
                            <Text>By using ABC Swap, you acknowledge that the platform is specifically tailored for the exchange of ABC Tokens. While ABC Swap aims to offer a secure and efficient environment for swapping ABC Tokens, it remains your responsibility to comprehend the risks and responsibilities associated with swapping these tokens.</Text>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                2. Use of Services
                            </Heading>
                            <Text>To access our Services, you must use non-custodial wallet software (“wallet”), which allows you to interact with public blockchains. Your relationship with that non-custodial wallet provider is governed by the applicable terms of service (with respect to these Terms of Service and with respect to a third party wallet and the applicable terms of service of such third party).  We do not have custody or control over the contents of your wallet and have no ability to retrieve or transfer its contents. By connecting your wallet to our Services, you agree to be bound by these Terms of Service incorporated herein by reference.</Text>
                            <Text>We may from time to time in the future offer additional services, regardless of whether such services are specifically defined in these Terms of Service.</Text>
                            <Text>You acknowledge that using our services involves certain risks, including but not limited to the potential loss of your digital assets. You should conduct your own independent research and seek professional advice before using our services. We reserve the right to refuse or cancel your participation for any reason at its sole discretion.</Text>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                3. Eligibility
                            </Heading>
                            <Text>By accessing and using our Services you represent and warrant to us that:</Text>
                            <UnorderedList>
                                <ListItem>
                                    You are at least 18 years old, or the legal age in your jurisdiction, with no legal impediment or incapability, capable of using the services and participating in any token distribution.
                                </ListItem>
                                <ListItem>
                                    You have read and understood the risks of using the Services, and that you are solely responsible for your actions.
                                </ListItem>
                                <ListItem>
                                    You are acting on your own account as principal and not as trustee, agent or otherwise on behalf of any other persons or entities.
                                </ListItem>
                                <ListItem>
                                    You have had the opportunity to take legal, financial, accounting or other advice that you deem appropriate prior to using the Services.
                                </ListItem>
                                <ListItem>
                                    You will only use the Services with legally obtained digital assets that belong to you, and with full legal and beneficial title to any such assets.
                                </ListItem>
                                <ListItem>
                                    Your access to the Services may be restricted based on your jurisdiction or geographical location. You must not use the Services if you are located in or a citizen or resident of any state, country, territory or other jurisdiction in which use of the Services would be illegal or otherwise violate any applicable law (a "Restricted Territory"). We reserve the right to restrict access to any Restricted Territory and may implement technical controls to prevent access to the Services from any Restricted Territory, including, but not limited to, Algeria, Bangladesh, Bolivia, Belarus, Myanmar (Burma), Côte d’Ivoire (Ivory Coast), Egypt, Republic of  Crimea, Cuba, Democratic Republic of the Congo, Iran, Iraq, Liberia, Libya, Mali, Morocco, Nepal, North Korea, Kuwait, Oman, Qatar, Somalia, Sudan, Syria, Tunisia, United Kingdom, United States, Venezuela, Yemen, Zimbabwe, or any jurisdictions in which the sale of cryptocurrencies are prohibited, restricted or unauthorized in any form or manner whether in full or in part under the laws, regulatory requirements or rules in such jurisdiction; or any state, country, or region that is subject to sanctions enforced by the United States, such as the Specially Designated Nationals and Blocked Persons List (“SDN List”) and Consolidated Sanctions List (“Non-SDN Lists”), the United Kingdom, or the European Union (collectively, “Restricted Territories”);
                                </ListItem>
                                <ListItem>
                                    You are not a resident of any restricted territory and have not used any technical means including any virtual private network (VPN) or other means to disguise or manipulate your geographical location to access the Services from a restricted territory; and
                                </ListItem>
                                <ListItem>
                                    You represent that your access and use of the Services will fully comply with all applicable laws and regulations, and that you will not access or use the Services to conduct, promote, or otherwise facilitate any illegal activity.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                4. Fees, Access & Features
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    While access to our Services is free of charge at this stage, although certain interactions and transactions incur a fee.
                                </ListItem>
                                <ListItem>
                                    Third-party network fees (e.g. Optimism gas costs, charged in $ETH) may be incurred.
                                </ListItem>
                                <ListItem>
                                    By using our Services, you agree to said fees, whoever the receiving entity may be. You acknowledge and agree that the level of the transaction costs may be increased, decreased, or otherwise altered, without notice and at our sole discretion. We take no responsibility for the existence or level of third-party network fees.
                                </ListItem>
                                <ListItem>
                                    You are responsible for making all necessary arrangements to interact (or continue to interact) with our Services.
                                </ListItem>
                                <ListItem>
                                    You agree to ensure that all interactions with our Services via your wallet are performed in compliance with these Terms of Service.
                                </ListItem>
                                <ListItem>
                                    You acknowledge and agree to abide by any features, mechanisms, rules and parameters in operation on our Services from time to time, and their consequences.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                5. Risks and Representations
                            </Heading>
                            <Text>
                                By accessing and using the Services, you represent that you understand the financially and technically risks associated with using cryptographic and blockchain-based systems, including, to the extent that:
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    You understand that the markets for these digital assets are nascent and highly volatile due to risk factors including, but not limited to, adoption, speculation, technology, security, and regulation.
                                </ListItem>
                                <ListItem>
                                    You understand that anyone can create fake versions of existing tokens and tokens that falsely claim to represent projects, and acknowledge and accept the risk that you may mistakenly swap those or other tokens.
                                </ListItem>
                                <ListItem>
                                    You understand that smart contract transactions automatically execute and settle, and that blockchain-based transactions are irreversible when confirmed.
                                </ListItem>
                                <ListItem>
                                    You acknowledge and accept that the cost and speed of transacting with cryptographic and blockchain-based systems such as Ethereum are variable and may increase dramatically at any time.
                                </ListItem>
                                <ListItem>
                                    You acknowledge that we are not responsible for any of these variables or risks, do not own or control the protocol, and cannot be held liable for any resulting losses that you experience while accessing or using the Services.
                                </ListItem>
                                <ListItem>
                                    You understand and agree to assume full responsibility for all of the risks of accessing and using the Services.
                                </ListItem>
                                <ListItem>
                                    You understand that we do not own or control any of the underlying software through which blockchain networks are formed. In general, the software underlying blockchain networks, including the Ethereum blockchain, is open source, such that anyone can use, copy, modify, and distribute it.
                                </ListItem>
                                <ListItem>
                                    By using the Services, you acknowledge and agree, that:
                                    <UnorderedList>
                                        <ListItem>
                                            We are not responsible for the operation of the blockchain-based software and networks underlying the Services;
                                        </ListItem>
                                        <ListItem>
                                            that there exists no guarantee of the functionality, security, or availability of that software and networks, and
                                        </ListItem>
                                        <ListItem>
                                            The underlying blockchain-based networks are subject to sudden changes in operating rules, such as those commonly referred to as “forks,” which may materially affect the Services.
                                        </ListItem>
                                    </UnorderedList>
                                </ListItem>
                                <ListItem>
                                    You understand that blockchain networks use public and private key cryptography. You alone are responsible for securing your private key(s). We do not have access to your private key(s). Losing control of your private key(s) will permanently and irreversibly deny you access to digital assets on the Ethereum blockchain or other blockchain based network. If your private key(s) are lost, then you will not be able to transfer your digital assets to any other blockchain address or wallet. If this occurs, then you will not be able to realize any value or utility from the digital assets that you may hold.
                                </ListItem>
                                <ListItem>
                                    You understand that our services and your digital assets could be impacted by one or more regulatory inquiries or regulatory actions, which could impede or limit the ability to continue providing our services.
                                </ListItem>
                                <ListItem>
                                    You acknowledge that the cost of transacting on the Ethereum blockchain is variable and may increase at any time causing impact to any activities taking place on the Ethereum blockchain, which may result in price fluctuations or increased costs when using the Services.
                                </ListItem>
                                <ListItem>
                                    You use the Services at your own risk. You acknowledge that the Services is subject to flaws and that you are solely responsible for evaluating any code provided in the ABC Launchpad interface.
                                </ListItem>
                                <ListItem>
                                    You acknowledge that the information available in the Services may not always be entirely accurate, complete, or current and may also include technical inaccuracies or typographical errors. To continue to provide you with as complete and accurate information as possible, information may be changed or updated from time to time without notice, including information regarding our policies. Accordingly, you should verify all information before relying on it, and all decisions based on information contained on or as part of the Services interface are your sole responsibility. No representation is made as to the accuracy, completeness, or appropriateness for any particular purpose of any information distributed via or otherwise when using the Services.
                                </ListItem>
                                <ListItem>
                                    By using the Services, you represent and warrant that you have been, are, and will be solely responsible for making your independent appraisal and investigations into the risks of a given transaction and the underlying digital assets, including smart contracts. You represent that you have sufficient knowledge, market sophistication, professional advice, and experience to make your evaluation of the merits and risks of any transaction conducted in connection with the Services or any digital asset.
                                </ListItem>
                                <ListItem>
                                    You accept all consequences of using the Services, including the risk that you may lose access to your digital assets indefinitely. All transaction decisions are made solely by you. Notwithstanding anything in these Terms, we accept no responsibility whatsoever for, and will in no circumstances be liable to you in connection with, your use of the Services for performing digital asset transactions, including entering into smart contracts.
                                </ListItem>
                                <ListItem>
                                    You understand that you are responsible for all swaps you place, including any erroneous orders that may be filled. We do not take any action to resolve erroneous swaps that result from your errors.
                                </ListItem>
                                <ListItem>
                                    You hereby acknowledge and agree that we will have no responsibility or liability for the risks set forth in this Section or inherent to the use of the Services.
                                </ListItem>
                                <ListItem>
                                    You hereby irrevocably waive, release, and discharge all claims, whether known or unknown to you, against us and our shareholders, members, directors, officers, employees, agents, and representatives, suppliers, and contractors related to any of the risks set forth in this Section or inherent to the use of the Services.
                                </ListItem>
                                <ListItem>
                                    You understand and acknowledge that before you use the Services, you should be familiar with any rules or laws relevant to the services provided.
                                </ListItem>
                                <ListItem>
                                    You should obtain independent advice about the different types of services available in both your home jurisdiction and other relevant jurisdictions before you start using the Services. If your country of residence imposes restrictions on digital assets, we may be required to discontinue your access to the Services . We may not be permitted to transfer digital assets or permit the transfer of digital assets as a consequence of a judicial or administrative order or regulatory environment.
                                </ListItem>
                                <ListItem>
                                    You are responsible for all taxes in respect of any gains obtained by using the Services. Before using our services you should understand the tax implications of acquiring, entering into, holding and disposing of a digital asset. You should consult your independent tax advisor to understand the relevant tax implications of your activities.
                                </ListItem>
                                <ListItem>
                                    You understand that the use of the Services is exposed to regulatory and legal risk, and that the regulatory framework of digital assets may change or vary according to each jurisdiction. The effect of regulatory legal risk may affect the value of any digital asset. The laws of various jurisdictions may apply to digital assets listed in the Services. Applying these laws and regulations to digital assets is untested, and laws and regulations are subject to change without prior notice. As a result of regulation and legislation around digital assets, the Services may become or not be available in certain jurisdictions.
                                </ListItem>
                                <ListItem>
                                    You understand that our Services, specifically the ABC Swap, facilitate peer-to-peer transactions, over which we have no means of administrative or other control.
                                </ListItem>
                                <ListItem>
                                    You understand that we have no ability to recover lost credentials or restore lost access to the wallet you use to access our Services.
                                </ListItem>
                                <ListItem>
                                    You understand that we will not be a party to or in any way oversee any transaction between you and any other user or third party.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                6. Third Party Tokens
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    The Services interface allows the exchange of utility tokens issued by external Projects in exchange for specified cryptocurrencies or tokens ("Token Sale").
                                </ListItem>
                                <ListItem>
                                    The information and contents of each Project and the nature and utility of tokens listed are the sole responsibility of the promoters of the Project, except when mentioned otherwise in the Project description.
                                </ListItem>
                                <ListItem>
                                    You acknowledge that we have no responsibility whatsoever regarding the contents, representations and risks associated with the purchase or bid of any token or digital asset associated with each Project, or participating in any token sale or distribution using the Services interface. You explicitly understand that we have not conducted any prior legal or technical, security or other assessment on the nature of the tokens listed through the Services interface. We do not make any representations or warranties regarding any information, veracity, viability or any other claims regarding the tokens listed in the Services. We are not registered in any country’s regulatory body for the issuance of any tokens.
                                </ListItem>
                                <ListItem>
                                    Each token sale or distribution process, including token allocation, pricing, and timing, will be determined exclusively by the promoters of each Project.
                                </ListItem>
                                <ListItem>
                                    Participating in any Token Sale or distribution of tokens does not guarantee the acquisition or allocation of any tokens. Allocation decisions will be subject to the rules and processes defined by each Project and its promoters.
                                </ListItem>
                                <ListItem>
                                    You agree and understand that: (a) all swaps you submit through the Services are considered unsolicited, which means that they are solely initiated by you; (b) you have not received any investment advice from us in connection with any swaps.
                                </ListItem>
                                <ListItem>
                                    You should decide to use the Services, as well as which Project tokens to purchase only after due and careful consideration. You should determine whether a Project is appropriate in light of your experience in similar transactions, financial resources and other relevant circumstances. If you are unsure that the Project’s assets are suitable, you should obtain independent legal, tax or financial advice. Before using the Services, you should obtain details of all commissions, fees and other charges.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                7. Third Party Representations
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    The Services interface may contain references or links to third-party resources, including, but not limited to, information, materials, products, or services that we do not own or control. In addition, third parties may offer promotions related to your access and use of the Services.
                                </ListItem>
                                <ListItem>
                                    We do not endorse or assume responsibility for such resources or promotions. If you access any such resources or participate in such promotions, you do so at your own risk, and you understand that the Terms do not apply to your dealings or relationships with any third parties.
                                </ListItem>
                                <ListItem>
                                    You expressly relieve us of any liability arising from your use of any such resources or participation in any such promotions or marketing campaigns.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                8. Prohibited Activities
                            </Heading>
                            <Text>
                                You agree not to engage in, or attempt to engage in, any of the following categories of prohibited activities in connection to your access and use of the Services:
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    Activities that infringe on or violate any copyright, trademark, service mark, patent, right of publicity, right of privacy, or other proprietary or intellectual property rights under any law or jurisdiction.
                                </ListItem>
                                <ListItem>
                                    Activities that seek to interfere with or compromise the integrity, security, or proper functioning of any computer, server, network, personal device, or other information technology system, including (but not limited to) the deployment of viruses and denial of service attacks.
                                </ListItem>
                                <ListItem>
                                    Activities that seek to defraud us or any other person or entity, including (but not limited to) providing any false, inaccurate, or misleading information in order to unlawfully obtain the property of another.
                                </ListItem>
                                <ListItem>
                                    Activities that violate any applicable law, rule, or regulation concerning the integrity of trading markets.
                                </ListItem>
                                <ListItem>
                                    Activities that violate any applicable law, rule, or regulation concerning the trading of securities or derivatives, including (but not limited to) the unregistered offering of securities and the offering of leveraged and margin commodity products to retail customers in any applicable jurisdiction.
                                </ListItem>
                                <ListItem>
                                    Activities that violate any applicable law, rule, or regulation in any jurisdiction, including (but not limited to) the restrictions and regulatory requirements.
                                </ListItem>
                                <ListItem>
                                    You warrant that you have no knowledge that, nor any reason to suspect that your Augmented Bonding Curve funding or revenue has been or will be derived from, is related to or represents any benefit arising in respect of any illegal activities.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                9. Intellectual Property
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    We own all intellectual property and other rights associated with our services provided under these Services, including, but not limited to, software, text, images, trademarks, service marks, copyrights, patents, and designs.
                                </ListItem>
                                <ListItem>
                                    Any of our names, logos, and other marks used in the Services as a part of our services, are trademarks owned by us, our affiliates or its applicable licensors. You may not copy, imitate or use such trademarks without our, or the applicable licensor's prior written consent.
                                </ListItem>
                                <ListItem>
                                    You acknowledge that certain aspects of our services may use, incorporate or link to certain open-source components and that your use of the services is subject to, and you will comply with, any applicable open-source licences that govern any such open-source components.
                                </ListItem>
                                <ListItem>
                                    Excluding third-party software that our services incorporate, we own the services and all portions thereof, including all technology, content and other materials used, displayed or provided on or in connection with the services, including all intellectual property rights therein and thereto, whether or not subject to the open-source licences, and hereby grant you a limited, non-exclusive, revocable, non-transferable, non-sublicensable licence to access and use those portions of the Services that are proprietary and not available pursuant to the open-source licences.
                                </ListItem>
                                <ListItem>
                                    The services are non-custodial. When you deposit digital assets into any smart contract, you retain control over those digital assets at all times. The private key associated with the Ethereum address from which you transfer digital assets is the only private key that can control the digital assets you transfer into the smart contracts. You may withdraw digital assets from any smart contract only to the Ethereum address from which you deposited the digital assets.
                                </ListItem>
                                <ListItem>
                                    All intellectual property rights, including but not limited to trademarks, logos, and content, related to Projects included in the ABC Launch, and associated materials, are owned by their respective owners. You agree not to reproduce, distribute, or use any intellectual property without prior written consent from the respective owner.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                10. Non-Custodial
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    The Services is a non-custodial software application, in which you are the sole responsible for the custody of the cryptographic private keys to the digital asset wallets you hold to access and use our services.
                                </ListItem>
                                <ListItem>
                                    These Terms do not create or impose any fiduciary duties on us.
                                </ListItem>
                                <ListItem>
                                    To the fullest extent permitted by law, you acknowledge and agree that we owe no fiduciary duties or liabilities to you or any other party, and that to the extent any such duties or liabilities may exist at law or in equity, those duties and liabilities are hereby irrevocably disclaimed, waived, and eliminated.
                                </ListItem>
                                <ListItem>
                                    You further agree that the only duties and obligations that we owe you are those set out expressly in these Terms.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                11. Privacy
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    While using the Services we may collect some personal data in order to provide our services, including your blockchain wallet address, completed transaction hashes and token IDs.
                                </ListItem>
                                <ListItem>
                                    To comply with AML and KYC regulations, you may be required to provide personal information and documentation. We reserve the right to conduct AML and KYC checks on participants and may refuse participation to anyone who fails to meet the required standards. We use the information we collect to detect, prevent, and mitigate financial crime and other illicit or harmful activities on the Services. For these purposes, we may share the information we collect with blockchain analytics providers. We share information with these service providers only so that they can help us promote the safety, security, and integrity of the Services.
                                </ListItem>
                                <ListItem>
                                    We may use third-party service providers which may receive or independently obtain your personal information from publicly-available sources. By accessing and using the Services, you understand and consent to our data practices and our service providers' treatment of your information.
                                </ListItem>
                                <ListItem>
                                    For more information please visit our privacy policy at <Link href="https://abcswap.xyz/#/privacy"><Text as="u">https://abcswap.xyz/#/privacy</Text></Link>
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                12. Modification of this Agreement
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    We reserve the right, in our sole discretion, from time to time, without prior notice, to modify, suspend or disable, temporarily or permanently, the Services in whole or in part, for any reason whatsoever, including, but not limited to, as a result of a security incident.
                                </ListItem>
                                <ListItem>
                                    All modifications will be effective when they are posted, and your continued access or use of the Services will serve as confirmation of your acceptance of those modifications. If you do not agree with any modifications to this Agreement, you must immediately stop accessing and using the Services. It is your responsibility to review them periodically.
                                </ListItem>
                                <ListItem>
                                    We will not be liable for any losses suffered resulting from any modification to the Services or from any suspension or termination, for any reason, of your access to all or any services of the Services.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                13. Disclaimers
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    The Services and the Projects listed are provided on an "as is" and "as available" basis, without any warranties or guarantees of any kind.
                                </ListItem>
                                <ListItem>
                                    The Services does not endorse or provide investment advice on any Projects. Participating in any Token Sale is solely at your own risk.
                                </ListItem>
                                <ListItem>
                                    The Services shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising out of or in connection with your participation in the Services or any Project.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                14. Indemnification
                            </Heading>
                            <Text>
                                You will defend, indemnify, and hold us harmless our Affiliates, and its Affiliates' respective shareholders, members, directors, officers, employees, attorneys, agents, representatives, suppliers and contractors (collectively, "Indemnified Parties") from any claim, demand, lawsuit, action, proceeding, investigation, liability, damage, loss, cost or expense, including without limitation reasonable attorneys' fees, arising out of or relating to:
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    Your use of, or conduct in connection with, the Services;
                                </ListItem>
                                <ListItem>
                                    Ethereum Blockchain assets associated with your Ethereum Address;
                                </ListItem>
                                <ListItem>
                                    Any feedback or user content you provide to the Services if any;
                                </ListItem>
                                <ListItem>
                                    Your violation of these Terms; or
                                </ListItem>
                                <ListItem>
                                    Your infringement or misappropriation of the rights of any other person or entity.
                                </ListItem>
                            </UnorderedList>
                            <Text>
                                If you are obliged to indemnify any Indemnified Party, we will have the right, in our sole discretion, to control any action or proceeding and to determine whether we wish to settle, and if so, on what terms. To the maximum extent permitted under applicable law, the Indemnified Parties disclaim all warranties and conditions, whether express or implied, of merchantability, fitness for a particular purpose, or non-infringement and disclaim all responsibility and liability for:
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    The Services are accurate, complete, current, reliable, uninterrupted, timely, secure, or error-free. Information (including, without limitation, the value or outcome of any transaction) available through the Services is provided for general information only and should not be relied upon or used as the sole basis for making decisions. Any reliance on the Services information is at your own risk;
                                </ListItem>
                                <ListItem>
                                    You expressly acknowledge that the Indemnified Parties are not liable for loss or damage caused by another user's conduct, unauthorised actors, or any unauthorised access to or use of the Services, including the Projects and its promoters;
                                </ListItem>
                                <ListItem>
                                    Viruses, worms, trojan horses, time bombs, cancelbots, spiders, malware or other types of malicious code that may be used to affect the functionality or operation of the Services
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                15. Limitation of Liability
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    We shall, in no event, be liable for any incidental, indirect, special, punitive, consequential or similar damages or liabilities whatsoever (including, without limitation, damages for loss of data, information, revenue, goodwill, profits or other business or financial benefit) arising out of or in connection with the Services (and any of their content and functionality), any execution or settlement of a transaction, any performance or nonperformance of the Services, Projects listed therein or any Token exchange, whether under contract, tort (including negligence), civil liability, statute, strict liability, breach of warranties, or under any other theory of liability, and whether or not we had been advised of, knew of or should have known of the possibility of such damages and notwithstanding any failure of the essential purpose of these Terms or any limited remedy hereunder.
                                </ListItem>
                                <ListItem>
                                    This limitation of liability shall apply to the fullest extent permitted by law.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                16. Release
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    You expressly agree that you assume all risks concerning your access to and use of the Services. Additionally, you expressly waive and release us from any liability, claims, causes of action, or damages arising from or in any way relating to your access to and use of the Services.
                                </ListItem>
                                <ListItem>
                                    These Terms will survive any termination of your access to the Services, regardless of the reasons for its expiration or termination, in addition to any other provision which by law or by its nature should survive.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="40px" fontWeight={500} color="brand.900">
                                17. Governing Law and Jurisdiction
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    These Terms shall be governed by and construed in accordance with the laws of Switzerland.
                                </ListItem>
                                <ListItem>
                                    Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Zug, Switzerland.
                                </ListItem>
                            </UnorderedList>
                            <Button
                                alignSelf="flex-end"
                                onClick={onClose}
                                mt="40px"
                            >
                                Close
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
