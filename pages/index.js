import {
    Heading,
    Flex,
    Button,
    Stack,
    Text,
    Box,
    Divider,
    Grid,
    Image,
    Link
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Container from '../components/Container'
import NextLink from 'next/link'
import Tutorial from '../components/Cards/Tutorial'
import Snippet from '../components/Cards/Snippet'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { snippetsFilePaths, SNIPPETS_PATH } from '../utils/mdxUtils'
import { tutorialsFilePaths, TUTORIALS_PATH } from '../utils/mdxUtils'

const url = 'https://coffeeclass.io/'
const title = 'Home – Coffeeclass'
const description = 'Learn to code and ship your app for free.'

export default function Index({ snippets, tutorials }) {
    return (
        <Container>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description
                }}
            />
            <Stack
                spacing={8}
                px={4}
                maxW="100em"
            >
                <Flex
                    flexDir="column"
                    mx={5}
                    maxW="100em"
                >
                    <Flex
                        flexDir={['column', 'column', 'row']}
                        justify="center"
                        align="center"
                        h="100vh"
                        as="section"
                    >
                        <Flex
                            flexDir="column"
                            w={['100%', '100%', 800]}
                            align="center"
                        >
                            <Heading as="h1" size="3xl" textAlign="center">Learn to <Flex display="inline" color="brand.500">code</Flex> 👨‍💻
                            and <Flex display="inline" color="red.400">ship</Flex> 🚀 your app for free.</Heading>
                            <Heading as="h2" color="gray.500" textAlign="center" size="md" my={8} letterSpacing="wide">Coffeeclass ☕ takes complex programming concepts and presents them in an easy to learn manner.
                            Browse snippets, tutorials, or learn a new skill.</Heading>
                            <Flex
                                flexDirection={['column', 'row', 'row']}
                                w="100%"
                                justify="center"
                            >
                                <NextLink href="#explore" passHref>
                                    <Button mr={4} w={['100%', 200, 200]} colorScheme="blue"><Flex as="span" mr={4}>🔭</Flex> Explore Content</Button>
                                </NextLink>
                                <Flex mt={[4, 0, 0]}>
                                    <NextLink href="/about" passHref>
                                        <Button variant="outline" w={['100%', 200, 200]} colorScheme="blue" to="/about">About</Button>
                                    </NextLink>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex as="section" flexDir="column">
                        <Heading as="h3" size="lg" mb={4} id="explore">Browse The Latest Tutorials</Heading>
                        <Flex wrap="wrap" justify="space-between">
                            <Tutorial
                                src="/content/tutorials/add-firebase-to-nextjs/feature.png"
                                title="Firebase + Next.js Quickstart"
                                description="Learn how to connect Next.js to Google's Firebase and
                                use authentication, cloud Firestore, Realtime Database, and
                                cloud storage."
                                tags={["firebase", "nextjs"]}
                                href="/tutorials/add-firebase-to-nextjs"
                            />
                            {/* Add more here... Either 2 or 4 */}
                        </Flex>
                    </Flex>

                    <Divider my={8} />

                    <Flex as="section" flexDir="column">
                        <Heading as="h3" size="lg" mb={10}>Only Have 5 Minutes? Check Out Some Snippets!</Heading>
                        <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]} gap={6}>
                            {snippets.map((post) => (
                                <Snippet
                                    key={post.data.title}
                                    src={`/content/snippets/${post.filePath.replace(/\.mdx?$/, '')}/${post.data.featureImg}`}
                                    title={post.data.title}
                                    description={post.data.description}
                                    tags={post.data.tags}
                                    as={`/snippets/${post.filePath.replace(/\.mdx?$/, '')}`}
                                    href={`/snippets/[slug]`}
                                />
                            ))}
                        </Grid>
                    </Flex>

                    <Divider my={8} />

                    <Flex
                        as="section"
                        flexDir={["column", "column", "row"]}
                        align="center"
                        justify="space-around"
                    >
                        <Flex flexDir="column" w={['100%', '100%', 500]}>
                            <Heading as="h3" size="lg" mb={2}>What Is Coffeeclass?</Heading>
                            <Text mb={2}>Coffeeclass is a suite of programming tutorial tools including this website and <Link color="blue.500" href="https://youtube.com/benjamincarlson" isExternal>this YouTube channel</Link>.</Text>
                            <Flex mb={2}>
                                <NextLink href="/about" passHref>
                                    <Button variant="outline" colorScheme="blue" w={['100%', 200, 200]} to="/about">Learn More</Button>
                                </NextLink>
                            </Flex>
                        </Flex>
                        <Flex w={['100%', '100%', 500]} justify="center" mt={[]}>
                            <Box w={200} h={200}>
                                <Image src="favicons/logo-transparent-bg.png" />
                            </Box>
                        </Flex>
                    </Flex>

                </Flex>
            </Stack>
        </Container>
    )
}

export function getStaticProps() {
    const tutorials = tutorialsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(TUTORIALS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    }).slice(0, 4)

    const snippets = snippetsFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(SNIPPETS_PATH, filePath))
        const { content, data } = matter(source)

        return {
            content,
            data,
            filePath,
        }
    }).slice(0,4)

    // console.log(snippets)

    return { props: { tutorials, snippets } }
}