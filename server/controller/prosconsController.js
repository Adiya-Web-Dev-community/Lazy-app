const ProsCons = require("../model/prosconsMode");

const create=async (req,res)=>{
    try {
        const newProsCons = new ProsCons(req.body);
        const prosCons = await newProsCons.save();
        res.status(201).json({ success: true, data: prosCons });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
}
const update=async(req,res)=>{
    try {
        const prosCons = await ProsCons.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
        if (!prosCons) {
          return res.status(404).json({ success: false, message: 'ProsCons not found' });
        }
        res.status(200).json({ success: true, data: prosCons });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
}

const Delete=async(req,res)=>{
    try {
        const prosCons = await ProsCons.findByIdAndDelete(req.params.id);
        if (!prosCons) {
          return res.status(404).json({ success: false, message: 'ProsCons not found' });
        }
        res.status(200).json({ success: true, message: 'ProsCons deleted successfully' });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
}

const getbyProsuctId=async(req,res)=>{
    try {
        const prosCons = await ProsCons.find({ productId: req.params.productId });
        res.status(200).json({ success: true, data: prosCons });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
}
module.exports = {
    create,
    update,
    Delete,
    getbyProsuctId
};
