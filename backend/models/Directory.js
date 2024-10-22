// models/directory.js
import mongoose from 'mongoose';

const directorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Directory', default: null }, // Parent directory for nested structure
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who owns the directory
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fs.files' }], // List of file IDs in this directory
    createdAt: { type: Date, default: Date.now },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


directorySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Directory = mongoose.model('Directory', directorySchema);

export default Directory;