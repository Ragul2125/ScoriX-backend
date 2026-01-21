export const questionPaperAgent = async (req, res) => {
  try {
    // Frontend data (prompt-like fields)
    const {
      courseDataModel,
      questionPaperFormat,
      answerKeyFormat,
      numberOfQuestions,
      questionWiseDeductionPattern,
    } = req.body;

    // Files
    const previousYearPapers = req.files["previousYearPapers"]?.map(
      (file) => `/uploads/questionpapers/${file.filename}`
    ) || [];

    const exactFiles = req.files["exactFiles"]?.map(
      (file) => `/uploads/questionpapers/${file.filename}`
    ) || [];

    // You can now send this data to your agent / AI processing service
    const agentPayload = {
      courseDataModel,
      questionPaperFormat,
      answerKeyFormat,
      numberOfQuestions,
      questionWiseDeductionPattern,
      previousYearPapers,
      exactFiles,
    };

    // 🔹 Example: send to AI service or just return response
    console.log("Agent payload:", agentPayload);

    res.status(200).json({
      message: "Data sent to Question Paper Agent",
      payload: agentPayload,
    });
  } catch (error) {
    console.error("Error in Question Paper Agent:", error);
    res.status(500).json({ message: "Server error" });
  }
};
