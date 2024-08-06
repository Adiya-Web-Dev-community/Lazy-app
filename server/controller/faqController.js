const FAQ = require('../model/faqModel');

const CreateFAQ = async (req, res) => {
  try {
    const newFAQ = new FAQ(req.body);
    const faq = await newFAQ.save();
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const UpdateFAQById=async(req,res)=>{
    try {
        const faq = await FAQ.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
        if (!faq) {
          return res.status(404).json({ success: false, message: 'FAQ not found' });
        }
        res.status(200).json({ success: true, data: faq });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
}

const GetAllFAQController=async(req,res)=>{
    try {
        const faqs = await FAQ.find();
        res.status(200).json({ success: true, data: faqs });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
}

const GetFAQById=async(req,res)=>{
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) {
          return res.status(404).json({ success: false, message: 'FAQ not found' });
        }
        res.status(200).json({ success: true, data: faq });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
}

const GetFAQByCAtegory=async(req,res)=>{
    try {
        const faqs = await FAQ.find({ category: req.params.category });
        res.status(200).json({ success: true, data: faqs });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
}
const GetFAQByNAme=async(req,res)=>{
    try {
        const faqs = await FAQ.find({ name: req.params.name });
        res.status(200).json({ success: true, data: faqs });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
}

const deleteFAQ=async(req,res)=>{
    try {
        const faq = await FAQ.findByIdAndDelete(req.params.id);
        if (!faq) {
          return res.status(404).json({ success: false, message: 'FAQ not found' });
        }
        res.status(200).json({ success: true, message: 'FAQ deleted successfully' });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
}

module.exports={
    CreateFAQ,
    UpdateFAQById,
    GetAllFAQController,
    GetFAQById,
    GetFAQByCAtegory,
    deleteFAQ,
    GetFAQByNAme
}