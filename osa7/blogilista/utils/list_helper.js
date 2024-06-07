const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => sum + item.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlogs = blogs => {
  let likes = 0
  let title = ''
  let author = ''
  blogs.forEach(value => {
    if (value.likes > likes) {
      likes = value.likes
      title = value.title
      author = value.author
    }
  })

  return {
    title: title,
    author: author,
    likes: likes,
  }
}

const mostBlogs = blogs => {
  let kirjoittajatOlio = {}
  let kirjoittajatLista = []

  blogs.forEach(value => {
    let eiOle = true
    kirjoittajatLista.forEach(kirjoittaja => {
      if (kirjoittaja.author === value.author) {
        eiOle = false
      }
    })
    if (eiOle) {
      kirjoittajatOlio[value.author] = {
        author: value.author,
        blogs: 0,
      }
      kirjoittajatLista.push({
        author: value.author,
      })
    }

    kirjoittajatOlio[value.author].blogs++
  })

  let eniten = {
    author: '',
    blogs: 0,
  }

  blogs.forEach(value => {
    if (kirjoittajatOlio[value.author].blogs > eniten.blogs) {
      eniten = kirjoittajatOlio[value.author]
    }
  })

  return eniten
}

const mostLikes = blogs => {
  let kirjoittajatOlio = {}
  let kirjoittajatLista = []

  blogs.forEach(value => {
    let eiOle = true
    kirjoittajatLista.forEach(kirjoittaja => {
      if (kirjoittaja.author === value.author) {
        eiOle = false
      }
    })
    if (eiOle) {
      kirjoittajatOlio[value.author] = {
        author: value.author,
        likes: 0,
      }
      kirjoittajatLista.push({
        author: value.author,
      })
    }

    kirjoittajatOlio[value.author].likes += value.likes
  })

  let eniten = {
    author: '',
    likes: 0,
  }

  blogs.forEach(value => {
    if (kirjoittajatOlio[value.author].likes > eniten.likes) {
      eniten = kirjoittajatOlio[value.author]
    }
  })

  return eniten
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
}
