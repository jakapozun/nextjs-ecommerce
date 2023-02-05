import sanityClient from '@sanity/client'
import imageBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: '9cw3noas',
    dataset: 'production',
    apiVersion: '2023-02-05',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = imageBuilder(client);

export const urlFor = (source) => builder.image(source);