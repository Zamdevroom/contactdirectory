// import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

// const directorySchema = new Schema({
//     name: { type: String, required: true },
//     parent: { type: Schema.Types.ObjectId, ref: 'Directory', default: null }, // Reference to parent directory
//     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user
// });

// const fileSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     content: {
//         type: Buffer, // Or String if you prefer
//         required: true,
//     },
//     directory: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Directory',
//         required: true,
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
// });

// const Directory = mongoose.model('Directory', directorySchema);
// const File = mongoose.model('File', fileSchema);

// export { Directory, File };
