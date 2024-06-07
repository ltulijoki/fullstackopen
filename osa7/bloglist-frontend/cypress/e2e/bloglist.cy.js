describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    let user
    user = {
      username: 'testuser',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    user = {
      username: 'seconduser',
      password: 'salasana',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('h2').contains('log in to application')
    cy.contains('username')
    cy.get('input#username[type=text]')
    cy.contains('password')
    cy.get('input#password[type=password]')
    cy.get('button#login-button[type=submit]').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('testuser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('an awesome blog')
      cy.get('#author').type('blogger')
      cy.get('#url').type('http://blogsurl.fi')
      cy.get('#create-blog-button').click()
      cy.get('.addedBlog').contains(
        'a new blog an awesome blog by blogger added'
      )
      cy.contains('an awesome blog blogger')
    })

    describe('When blog is created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'an awesome blog',
          author: 'blogger',
          url: 'http://blogsurl.fi',
        })
      })

      it('A blog can be liked', function () {
        cy.contains('an awesome blog').as('blogNameAuthorDiv')
        cy.get('@blogNameAuthorDiv').contains('view').click()
        cy.get('@blogNameAuthorDiv').parent().as('blogDiv')
        cy.get('@blogDiv').contains('like').click()
        cy.get('@blogDiv').contains('likes 1')
      })

      describe('Removing blogs', function () {
        it('A blog can be removed', function () {
          cy.contains('an awesome blog').as('blogNameAuthorDiv')
          cy.get('@blogNameAuthorDiv').contains('view').click()
          cy.get('@blogNameAuthorDiv').parent().contains('remove').click()
          cy.should('not.contain', 'an awesome blog')
        })

        it("A blog can't be removed with wrong user", function () {
          cy.login({ username: 'seconduser', password: 'salasana' })
          cy.contains('an awesome blog').as('blogNameAuthorDiv')
          cy.get('@blogNameAuthorDiv').contains('view').click()
          cy.get('@blogNameAuthorDiv').parent().should('not.contain', 'remove')
        })
      })

      it('Blogs are sorted by likes', function () {
        cy.createBlog({
          title: 'second',
          author: 'blogger',
          url: 'http://blogsurl.fi',
        })
        cy.contains('an awesome blog').as('awesomeBlogNameAuthorDiv')
        cy.get('@awesomeBlogNameAuthorDiv').contains('view').click()
        cy.get('@awesomeBlogNameAuthorDiv').parent().as('awesomeBlogDiv')
        cy.get('@awesomeBlogDiv').contains('like').click()
        cy.get('@awesomeBlogDiv').contains('likes 1')
        cy.get('@awesomeBlogDiv').contains('like').click()
        cy.get('@awesomeBlogDiv').contains('likes 1')
        cy.contains('second').as('nonawesomeBlogNameAuthorDiv')
        cy.get('@nonawesomeBlogNameAuthorDiv').contains('view').click()
        cy.get('@nonawesomeBlogNameAuthorDiv').parent().as('nonawesomeBlogDiv')
        cy.get('@nonawesomeBlogDiv').contains('like').click()
        cy.get('@nonawesomeBlogDiv').contains('likes 1')
        cy.get('.blog').eq(0).should('contain', 'an awesome blog')
        cy.get('.blog').eq(1).should('contain', 'second')
      })
    })
  })
})
