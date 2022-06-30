import { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'

// we don't technically need to write a mapStateToProps, since we're not interested
// in reading anything from here!
// ...but we need a mapStateToProps in order to get access to the second argument
// of connect, mapDispatchToProps (which is what we want to use in here!)
// ...so, let's write a very dumb mapStateToProps

const mapStateToProps = (state) => {
  return {}
  // let's leave it as an empty object, so we're not going to have
  // any additional and useless prop!
}

// mapDispatchToProps is a function returning an object
// every KEY you add to this object, is going to become an additional PROP for BookDetail
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (book) => {
      dispatch({
        type: 'ADD_TO_CART', // this is the type, the only mandatory property
        // the action I'm dispatching here should carry the book into the reducer
        payload: book,
        // the payload is an additional piece of info you want to dispatch your action with!
      })
    },
  }
}

class BookDetail extends Component {
  state = {
    book: null, // this will be one of the books, eventually!
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bookSelected !== this.props.bookSelected) {
      this.setState({
        book: this.props.bookSelected,
      })
    }
  }

  render() {
    return (
      <div className="mt-3">
        {this.state.book ? (
          <>
            <Row>
              <Col sm={12}>
                <h1>{this.state.book.title}</h1>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <div className="mt-3">
                  <img
                    className="book-cover"
                    src={this.state.book.imageUrl}
                    alt="book selected"
                  />
                </div>
              </Col>
              <Col sm={8}>
                <p>
                  <span className="font-weight-bold">Description:</span>
                  {this.state.book.description}
                </p>
                <p>
                  <span className="font-weight-bold">Price:</span>
                  {this.state.book.price}
                </p>
                <Button
                  color="primary"
                  onClick={() => {
                    this.props.addToCart(this.state.book)
                  }}
                >
                  ADD TO CART
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col sm={12}>
              <h3>Please select a book!</h3>
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)

// BookDetails just wants to make its Add to Cart button working!
// it's not interested in reading anything from the redux store...
// it wants though to add a book to the cart! that will involve DISPATCHING an ACTION
