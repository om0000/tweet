import React,{useState,useEffect} from 'react';
import { Layout, Menu,Row, Col, Divider} from 'antd';
import {
  TwitterSquareFilled
} from '@ant-design/icons';
import {connect} from 'react-redux';
import moment from 'moment';

import {addTweet,updateTweetList} from '../actions';
import TweetForm from './TweetForm.js'
import Tweets from './Tweets.js';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

const App=(props)=>{
  
  useEffect(()=>{
    setInterval(  
      () => {
        filterUsers()
      },  
      2000  
    ); 
  })

  const checkTweetTime=(tweet)=>{
    return moment().format("HH:mm:ss")<tweet.time;
  }

  const processDate=(date)=>{
    var parts = date.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  const checkForEqualDates=(tweet)=>{
    if(processDate(moment().format('DD/MM/YYYY'))>processDate(moment(tweet.date).format('DD/MM/YYYY'))){
      return false;
    }else if(processDate(moment().format('DD/MM/YYYY'))<processDate(moment(tweet.date).format('DD/MM/YYYY'))){
      return false;
    }else{
      return true;
    }
  }

  const checkTweetDate=(tweet)=>{
    if(new Date(moment().format('DD/MM/YYYY'))<new Date(moment(tweet.date).format('DD/MM/YYYY'))){
      return true;
    }else if(checkForEqualDates(tweet)){
      // console.log('in else if')
      return checkTweetTime(tweet);
    } 
  }

  const filterUsers=()=>{
    let tweets=[...props.tweets];
    let newTweets=[];
    tweets.forEach(tweet=>{
      if(checkTweetDate(tweet)){
        newTweets.push(tweet)
      };
    });
    props.updateTweetList(newTweets);
  }

  const addTweet=(tweet)=>{
    props.addTweet(tweet);
  }

  return (
    <Layout style={{height: '100vh',overflow:'hidden'}}>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0,color:'white',textAlign:'center',fontSize:'30px',fontWeight:'medium',fontFamily:'Roboto',background:'#00acee'}}><TwitterSquareFilled /> Disappearing Tweet</Header>
        <Content style={{ margin: '0 16px' }}>                       
                      
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <TweetForm
                createTweet={addTweet}
              />
            </Col>
            <Col className="gutter-row" span={1}>
            </Col>
            <Col className="gutter-row" span={16}>
              <Divider orientation="left">Tweets</Divider>
              <Tweets style={{overflowY:'auto',height:'50vh'}} />
            </Col>
            <Col className="gutter-row" span={1}>
            </Col>            
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Disappearing Tweet ©2020 Created by Om</Footer>
      </Layout>
    </Layout>
  );
}

const mapStateToProps=(state)=>{
  return {tweets:state.tweets};
}

export default connect(mapStateToProps,{addTweet,updateTweetList})(App)