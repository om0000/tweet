import React,{useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Card, Col, Row,Radio,Button } from 'antd';
import {selectUser, deleteUser} from '../actions';
import {
    TwitterCircleFilled
} from '@ant-design/icons';
  
const Tweets=(props)=>{


    const printTweets=()=>{
        let tweets=[...props.tweets];
        tweets.sort(function(a,b){
            return b.date>a.date;
        })
        
        
        return tweets.map(tweet=>{
            return (
                <Col span={8}>
                    <Card bordered={false} style={{overflowY:'auto',height:'inherit'}}>
                        <>
                            <p style={{fontWeight:'bold'}}><TwitterCircleFilled style={{color:'#00acce',padding:'0 1vw'}} />{tweet.date}</p>
                            <p>{tweet.message}</p>    
                        </>
                    </Card>
                </Col>
            )
        })
    }

    return (
        <div className="site-card-wrapper" style={{overflowY:'auto',overflowX:'hidden',height:'58vh'}}>
            <Row gutter={[16,16]}>
                {
                    printTweets()
                    
                }
            </Row>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {tweets:state.tweets};
}

export default connect(mapStateToProps)(Tweets);