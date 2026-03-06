const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const router = express.Router();

const Admin = mongoose.model('Admin');
const AdminPassword = mongoose.model('AdminPassword');

// List credentials
router.get('/credential-manager', async (req, res) => {
    try {
        const users = await Admin.find({ removed: false, role: { $ne: 'owner' } }).select('-password').sort({ created: -1 });
        return res.status(200).json({ success: true, result: users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// Create credential
router.post('/credential-manager', async (req, res) => {
    try {
        const { email, name, role, password } = req.body;

        // Check if exists
        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create Admin
        const newAdmin = await Admin.create({
            email,
            name,
            role,
            enabled: true
        });

        // Create Password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(salt + password, 10);

        await AdminPassword.create({
            user: newAdmin._id,
            password: hash,
            salt: salt
        });

        return res.status(200).json({ success: true, result: newAdmin, message: 'User created' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// Update credential
router.patch('/credential-manager/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, role, password } = req.body;

        const updateData = { email, name, role };
        const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, { new: true });

        if (password && password.trim() !== '') {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(salt + password, 10);
            await AdminPassword.findOneAndUpdate({ user: id }, { password: hash, salt: salt });
        }

        return res.status(200).json({ success: true, result: updatedAdmin, message: 'User updated' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// Delete credential
router.delete('/credential-manager/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Admin.findByIdAndUpdate(id, { removed: true, enabled: false });
        await AdminPassword.findOneAndUpdate({ user: id }, { removed: true });

        return res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
