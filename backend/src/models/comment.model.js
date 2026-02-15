import {Schema,model} from 'mongoose';
const commentSchema= new Schema({
  name:{
    type:String,
    require:true,
  },
  email:{
  type:String,
  require:true,
  },
  comment:{
    type:String,
    require:true,
    min:3
  }

},
{timestamps:true});
const comment=model("Comment",commentSchema);
export default comment;