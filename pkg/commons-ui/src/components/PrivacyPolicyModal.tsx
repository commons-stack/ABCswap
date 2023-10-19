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
    ListItem,
    UnorderedList,
} from '@chakra-ui/react';

export default function PrivacyPolicyModal() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Link onClick={onOpen} color="blue">Privacy Policy</Link>
            <Modal size={'5xl'} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent border="1px solid black" borderRadius="16px">
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack m="5%" color="brand.900" spacing={5} alignItems="flex-start">
                            <Heading>Privacy Policy</Heading>
                            <Text>
                                This privacy policy (“Privacy Policy”) provides an extensive insight into how ABC Labs (“ABC Labs”, “We”, “us”, “our”)  and all platforms affiliated with ABC Labs, including but not limited to the ABC Swap and ABC Launch Websites, all their Subdomans and affiliated applications  [abcswap.xyz ; launch.abcswap.xyz] (collectively “Platforms”) collect, share or use data about you (“user(s)”, “You”, “your”) with connection to the Platforms.
                            </Text>
                            <Text>
                                This Privacy Policy, together with our Terms of Service (“Terms”) governs the collection and processing of your data and is applicable to all the information collected through the Platforms, upon the use of such Platforms, any related services, marketing, events and/or any other locations that are in any way linked to this Privacy Policy (collectively, the “Services”).
                            </Text>
                            <Text as="b">
                                Please read this Policy and our Terms carefully. By accessing our Platforms, you are consenting to the information collection and use practices described in this Privacy Policy. If you do not agree to this Privacy Policy, you should immediately cease to continue the use of the Services.
                            </Text>
                            <Heading fontSize="32px" fontWeight={500} color="brand.900">
                                COLLECTION OF INFORMATION
                            </Heading>
                            <Text as="b">
                                What information is collected?
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    When you use our Services, our servers may automatically log standard data provided by the browser in use and may include but is not limited to, Internet Protocol (IP) address, browser type and version, geolocation data, username, email, crypto wallet addresses, voting history, and DAO addresses you subscribe to.
                                </ListItem>
                                <ListItem>
                                    In certain cases, your consent to use personal information may be required, which may be withdrawn at any time, by reaching out to us via the contact details provided in this Privacy Policy or our Platforms. We shall get in touch with you every time consent to process any data is required.
                                </ListItem>
                                <ListItem>
                                    We may need to collect and process additional personal information in order to provide services, perform any contractual obligations, or form any/all legal compliance. In such cases, we shall get in contact with you.
                                </ListItem>
                            </UnorderedList>
                            <Text as="b">
                                How is the information collected?
                            </Text>
                            <Text>
                                We process personal information that the user provides directly through various channels:
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    We also automatically collect information from your computer or mobile device when you browse through our Platforms. This information may include but is not limited to:
                                    <UnorderedList>
                                        <ListItem>
                                            the time and date of your visit;
                                        </ListItem>
                                        <ListItem>
                                            domain name;
                                        </ListItem>
                                        <ListItem>
                                            operating system;
                                        </ListItem>
                                        <ListItem>
                                            your computer or mobile used to access our services;
                                        </ListItem>
                                        <ListItem>
                                            browser version number;
                                        </ListItem>
                                        <ListItem>
                                            search terms entered on the Platforms;
                                        </ListItem>
                                        <ListItem>
                                            pages and links used to access the Platforms
                                        </ListItem>
                                        <ListItem>
                                            the pages of our Platforms that you access;
                                        </ListItem>
                                        <ListItem>
                                            IP Address.
                                        </ListItem>
                                        <ListItem>
                                            the content viewed and features accessed on our Platforms
                                        </ListItem>
                                        <ListItem>
                                            the web pages and the search terms entered on ABC Labs websites
                                        </ListItem>
                                    </UnorderedList>
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="32px" fontWeight={500} color="brand.900">
                                USE OF INFORMATION
                            </Heading>
                            <Text>
                                We may use the collected information for the following purposes:
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    providing services to you;
                                </ListItem>
                                <ListItem>
                                    marketing and business activities in relation to our  services, including but not limited to newsletters sending, updates, marketing communications and other information that may be of interest to you;
                                </ListItem>
                                <ListItem>
                                    complying with legal and regulatory obligations;
                                </ListItem>
                                <ListItem>
                                    exercising or defending any legal rights;
                                </ListItem>
                                <ListItem>
                                    monitoring the use of Platforms for business purposes which may include analysis of usage, measurement of site performance and generation of marketing reports;
                                </ListItem>
                                <ListItem>
                                    for legitimate business interests, such as business research and analysis, managing our Platforms and Services;
                                </ListItem>
                                <ListItem>
                                    looking into any complaints or queries;
                                </ListItem>
                                <ListItem>
                                    preventing and responding to actual or potential fraud or illegal activities;
                                </ListItem>
                                <ListItem>
                                    reviewing and processing any job application in case any user has applied for a position;

                                </ListItem>
                                <ListItem>
                                    operating our Platforms, customer support, marketing and research services related to the Platforms;

                                </ListItem>
                                <ListItem>
                                    cookies used are strictly necessary for the smooth functioning of the Platforms and Services.

                                </ListItem>
                            </UnorderedList>
                            <Text>
                                We do not anticipate using your information for any purposes apart from business purposes. Our purposes include, but are not limited to:
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    Operating and managing the Services; performing services requested by you such as responding to your comments, questions, and requests, and providing information support; sending you technical notices, updates, security alerts, information regarding changes to our policies, and support and administrative messages; detecting, preventing, and addressing fraud, breach of Terms, and threats, or harm; and compliance with legal and regulatory requirements.
                                </ListItem>
                                <ListItem>
                                    Protecting the security and integrity of the Services; improving the Services and other websites, apps, products and services.
                                </ListItem>
                                <ListItem>
                                    Notwithstanding the above, we may use information that does not identify you (including information that has been aggregated or de-identified) for any purpose except as prohibited by applicable law.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="32px" fontWeight={500} color="brand.900">
                                SHARING AND DISCLOSURE OF INFORMATION
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    We share personal information with our affiliates and third-party service providers that assist us in providing service. This may include, but is not limited to, sharing information with third-party contractors, bound by obligations of confidentiality, in connection with the processing of your personal information for the purposes described in this Privacy Policy, such as but not limited to, IT and communications service providers, third parties relevant to the services that we provide including regulators, authorities and governmental institutions.
                                </ListItem>
                                <ListItem>
                                    We may transfer personal information outside Europe. In such cases, we shall ensure that it is protected and transferred in a manner consistent with legal requirements applicable to the information.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="32px" fontWeight={500} color="brand.900">
                                SECURITY OF INFORMATION
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    We ensure that your personal information collected by us is subject to appropriate security measures.
                                </ListItem>
                                <ListItem>
                                    Professional Advisors - we share information for audits and legal compliances with our professional advisors.
                                </ListItem>
                                <ListItem>
                                    Security and Compelled Disclosure - Information stored by us is shared with public officials for legal compliance enforcement and authorised security concerns.
                                </ListItem>
                                <ListItem>
                                    We only store your information for a limited period of time and strictly only for as long as is necessary for the relevant purpose and/or for as long as it is necessary to comply with legal obligations, laws or regulations.
                                </ListItem>
                                <ListItem>
                                    Fulfilling your Requests - we may share your information with you with your consent at your request or direction.
                                </ListItem>
                                <ListItem>
                                    Notwithstanding the above, we may share information that does not identify you (including information that has been aggregated or de-identified) except as prohibited by applicable law.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="32px" fontWeight={500} color="brand.900">
                                USE OF COOKIES
                            </Heading>
                            <UnorderedList>
                                <ListItem>
                                    Cookies are sent to your browser from the Platforms and stored on your device. Tracking technologies such as beacons, tags, and scripts are used to collect and track information and to improve and analyze our Services.
                                </ListItem>
                                <ListItem>
                                    We may use and integrate third-party applications with our Platforms to improve the user experience. Cookies by such a third party may be placed on your browsing device, and they can be managed by checking the third party’s website for more information about cookie management and how to "opt-out" of receiving cookies from them.
                                </ListItem>
                                <ListItem>
                                    You may instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="32px" fontWeight={500} color="brand.900">
                                EUROPEAN UNION / UNITED KINGDOM ADDENDUM
                            </Heading>
                            <Text as="b">
                                STORING OF DATA
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    The personal information collected by us may be transferred to and processed in countries outside the European Economic Area (“EEA”) and the United Kingdom (“UK”). We will take all necessary steps to ensure that your personal information is treated securely and in accordance with this Privacy Policy.
                                </ListItem>
                                <ListItem>
                                    For any transfers of data outside the EEA or the UK, the data transfer will be under the European Commission’s model contracts for the transfer of personal information to third countries (i.e., the standard contractual clauses) (the “Model Clauses”), or any equivalent contracts issued by the relevant competent authority of the UK.
                                </ListItem>
                            </UnorderedList>
                            <Text as="b">
                                DATA PROTECTION RIGHTS‍
                            </Text>
                            <Text>
                                You are entitled to a certain number of legal rights concerning the personal information we may hold about you. These rights can be exercised at any time by contacting us.
                            </Text>
                            <Text>
                                The following rights apply regarding the collection of your personal information:
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    Right to Access: you have the right to access your personal information stored with us, how we use it, and who we share it with.
                                </ListItem>
                                <ListItem>
                                    Right of Portability: you have the right to receive a copy of all your personal information stored by us in a structured, commonly used and machine-readable format and/or request transfer of the same to a third party, in certain circumstances and with certain exceptions.
                                </ListItem>
                                <ListItem>
                                    Right to Rectification: you have the right to correct any inaccurate personal information.
                                </ListItem>
                                <ListItem>
                                    Right to Erasure: in certain circumstances, you have the right to delete your personal information stored with us. There may be circumstances where you ask us to erase personal information, but we are legally entitled to retain it; in such circumstances, the same shall not be erased.
                                </ListItem>
                                <ListItem>
                                    Right to Restrict Processing: you have the right to require us to stop processing the personal information we hold about you, other than for storage purposes, in certain circumstances.
                                </ListItem>
                                <ListItem>
                                    Right to Objection: you have the right to object to our processing of your personal information. There may be circumstances where you object to or asks us to restrict the processing of personal information, but we are legally entitled to refuse that request.
                                </ListItem>
                                <ListItem>
                                    Objection to Marketing: you can object to marketing at any time by opting out using the unsubscribe/opt-out function displayed in our communications to you.
                                </ListItem>
                                <ListItem>
                                    Withdrawal of Consent: Where we rely on consent to process your personal information, you have the right to withdraw this consent at any time In certain circumstances it may be lawful for us to continue processing without consent if we have a legitimate reason (other than consent) for doing so.
                                </ListItem>
                                <ListItem>
                                    The aforementioned rights are not absolute and may be limited by law.
                                </ListItem>
                            </UnorderedList>
                            <Text as="b">
                                REQUESTS AND COMPLAINTS
                            </Text>
                            <UnorderedList>
                                <ListItem>
                                    <ListItem>
                                        If you have complaints about how we process your personal information, please contact us at info@abcswap.xyz and we will respond to your request as soon as possible.
                                    </ListItem>
                                    <ListItem>
                                        If you think we have infringed data protection laws, you may file a claim with the data protection supervisory authority in the EEA country of your residence.
                                    </ListItem>
                                </ListItem>
                            </UnorderedList>
                            <Heading fontSize="32px" fontWeight={500} color="brand.900">
                                CONTACT US
                            </Heading>
                            <Text>
                                For further information on the collection, use, disclosure, transfer or processing of personal information or the exercise of any of the rights listed above, please contact ABC Labs by sending an email to info@abcswap.xyz.
                            </Text>
                            <Button
                                alignSelf="flex-end"
                                onClick={onClose}
                                mt="32px"
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
