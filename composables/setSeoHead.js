export default function (seoData) {
    // puzzle together link to image host upload older (cloudinary)
    const rtc = useRuntimeConfig();
    const cEnv = rtc.public.cloudinaryEnvUrl;
    const assetUrlBase = cEnv + "/image/upload" + "/c_scale/w_600/q_auto:best"
    // check if metaImage is an absolute url or not
    let isAbsolute = /^([a-z0-9]*:|.{0})\/\/.*$/.test(seoData.metaImage)
    // return set absolute url or create one 
    let imageUrl = computed(() => {
        if(isAbsolute) {
            return seoData.metaImage
        } else {
            return assetUrlBase + seoData.metaImage
        }
    }) 
    useSeoMeta({
        title: seoData.metaTitle,
        metaDescription: seoData.metaDescription,
        metaImage: imageUrl,
        keywords: seoData.keywords,
        ogTitle: seoData.metaTitle,
        ogDescription: seoData.metaDescription,
        ogImage: imageUrl
    })
}