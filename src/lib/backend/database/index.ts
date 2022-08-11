import mongoose from "mongoose"
const { DB_CONN_STRING } = process.env
const connect = async (): Promise<typeof mongoose> => {
  return await mongoose.connect(DB_CONN_STRING as string)
}
export default connect
