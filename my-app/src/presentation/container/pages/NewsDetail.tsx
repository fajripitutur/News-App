import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  CardText, CardBody, CardImg, CardTitle, CardSubtitle, Container, Row, Col
} from 'reactstrap';
import { RootStore } from "../../../application/store"
import { useParams } from "react-router-dom";
import { GetNewsDetail } from "../../../application/models/actions/action/newsDetailAction"
import { NavigasiBar, Loading, Error } from "../../../infrastructure/components"
import { changeDateFormat } from "../../../application/helpers"

export default function NewsDetail() {
  const {newsDetail, loading} = useSelector((state: RootStore)=> state.newsDetailReducer);
  const dispatch = useDispatch();
  const {title} = useParams() 

  useEffect(() => {
    dispatch(GetNewsDetail(title))
  }, [])

  if (loading) {
    return (
      <Loading/>
    )
  }

  if (!newsDetail?.articles[0]) {
    return <Error/>
  }

  return (
    <>
      <NavigasiBar/>
      <Container className="mt-3">
        <CardBody className="mb-3" style={{maxWidth: "100%"}}>
          <Row g-0>
            <Col col-2>
              <CardImg style={{height: "60vh", width: "40vw"}} src={newsDetail?.articles[0]?.urlToImage} alt="Card image cap"/>
              <CardText className="card-text text-" style={{fontSize: "10px"}}>Published date: {changeDateFormat(newsDetail?.articles[0]?.publishedAt)}</CardText>
            </Col>
            <Col col-10>
              <CardBody>
                <CardTitle style={{fontWeight: 'bold'}} tag="h4">{newsDetail?.articles[0]?.title}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{newsDetail?.articles[0]?.author}</CardSubtitle>
                <CardText className="card-text">{newsDetail?.articles[0]?.content}</CardText>
              </CardBody>
            </Col>
          </Row>
        </CardBody>
      </Container>
    </>
  )
}
