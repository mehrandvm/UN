import en from "./en"
import fa from "./fa"

const vocabs = (language, vocab) => {
  if (language == "en") {
    return en[vocab]  || `${key}`
  } else if (language == "fa") {
    return fa[vocab]  || `${key}`
  } else {
    return vocab
  }
}

export default vocabs