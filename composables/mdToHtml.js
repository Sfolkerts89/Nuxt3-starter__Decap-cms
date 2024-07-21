import { parseMarkdown } from '@nuxtjs/mdc/runtime'


export default async function (md) {
    const cEnv = useRuntimeConfig().public.cloudinaryEnvUrl + '/'
    // console.log("yes?", cEnv)
    const rawMd = await useAsyncData('markdown', () => parseMarkdown(md))
    // // Iterate to get the array of elAements returned by parseMarkdown
    const htmlObjectFromrawMd = await rawMd.data.value.body.children
    // htmlString will be populated with recursive functions and returned in the end
    let htmlString = ""

    console.log("htmlObjectFromrawMd", htmlObjectFromrawMd)
    // THE FUNCTIONS in order from parent > child > value (Object > key, value)

    //-- 1.1
    function createParentElement(elB) {
        let elInner = new String
        elInner = createChildElement(elB.value)
        // console.log("// Return from 1.1: ", elB.tag, elInner)
        return toElementString(elB.tag, elInner);
    }

    //-- 1.2
    function createChildElement(elB) {
        let childElementAsString = new String
        for (let i = 0; i < elB.length; i++) {
            if (elB[i].type === "text") {
                childElementAsString += elB[i].value
            }
            else if (elB[i].tag == 'img') {
                let src = elB[i].props.src
                let className = 'markdown-image'
                let isAbsolute = /^([a-z0-9]*:|.{0})\/\/.*$/.test(src)
                childElementAsString = `<img src="${isAbsolute ? src : cEnv + src}" alt="${elB[i].props.alt}" class="${className}" />`

            }
            else {
                let elInner = new String
                elInner = createChildElement(elB[i].children);
                childElementAsString += toElementString(elB[i].tag, elInner);
            }
        }
        console.log("// return from 1.2: ", childElementAsString)
        return childElementAsString
    }

    //-- 1.3 Returns <tag>value</tag> (or a linked version if tag === "a")
    function toElementString(tag, value) {
        let tagStart = new String
        if (tag === "a") {
            tagStart = "<" + `${tag}` + ' href="' + `${value}` + '"' + ' target="_blank"' + ">"
        } if (tag === "br") {
            // console.log("1.3: br")
            // do nothing: stop tagStart from rendering a 'second' </br>
        }
        else {
            tagStart = "<" + `${tag}` + ">"
        }
        const tagEnd = "</" + `${tag}` + ">"
        const res = tagStart + value + tagEnd
        // console.log("// return from 1.3: ", res)
        return res
    }


    // 2.1
    function markdownToHtmlLoop(elA) {
        // Iterate through all the parent level array (A) returned from result
        for (let i = 0; i < elA.length; i++) {
            const elAO = new Object({
                tag: elA[i].tag,
                value: elA[i].children

            })
            // console.log("elAO (raw single parent Object from HTML array): ", elAO)
            // console.log("!! return from main loop 2.1: ", createParentElement(elAO))
            htmlString += createParentElement(elAO)
        }
    }

    // Call main loop (2.1)
    markdownToHtmlLoop(htmlObjectFromrawMd)
    // Return the entire HTML object as a single string; mount as you wish
    return htmlString
}
