import React,{useState} from 'react';
import { Input, Tooltip,Button,DatePicker, Space,TimePicker  } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const { TextArea } = Input;
const UserForm=(props)=>{
    const [tweet,setTweet]=useState("");
    const [deleteDate,setDeleteDate]=useState(moment().format('DD/MM/YYYY'))
    const [deleteTime,setDeleteTime]=useState(moment().format("HH:mm:ss"));

    const onTimeChange=(time, timeString)=>{
        if(time==null){
            setDeleteTime(null);    
        }else{
            setDeleteTime(timeString);
        }
    }
    
    const onDateChange=(date,dateString)=>{
        // console.log(date);
        // console.log(dateString);
        if(date==null){
            setDeleteDate(null);    
        }else{
            setDeleteDate(dateString);
        }
    }

    const createTweet=()=>{
        // console.log(tweet);
        // console.log(deleteDate);
        // console.log(deleteTime);
        if(tweet.length==0){
            alert("Please write something in the tweet");
        }else if(deleteDate==null || deleteTime==null){
            alert("Please enter both the date and the time");
        }else{
            let tweetObj={
                message:tweet,
                date:deleteDate,
                time:deleteTime
            }
            props.createTweet(tweetObj);
        }
    }

    return (
        <div style={{marginTop:'5vh'}}>
            <TextArea
                style={{width:'80%',margin:'0 2vw'}}
                rows={4}
                placeholder="Write a tweet"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                <Tooltip title="Please try to enter a valid username">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
                }
                value={tweet}
                onChange={(e)=>setTweet(e.target.value)}
            />     
                <div style={{textAlign:'center',margin:'2vh 0'}}>
                    <span>Delete Date:</span> 
                    <DatePicker 
                        onChange={onDateChange}
                        defaultValue={moment(moment().format('DD/MM/YYYY'), dateFormatList[0])} 
                        format={dateFormatList}  
                    />
                </div>
                <div style={{textAlign:'center',margin:'2vh 0'}}>
                     <span>Delete Time:</span>
                     <TimePicker
                        onChange={onTimeChange}
                        defaultValue={moment(moment().format("HH:mm:ss"), 'HH:mm:ss')}
                    />
                </div>
            <Button type="primary" style={{marginLeft:'5vw',marginTop:'2vh'}} onClick={createTweet}>Tweet</Button>
      </div>     
    )
}

export default UserForm;