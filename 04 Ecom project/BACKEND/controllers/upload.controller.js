export const uploadSingle = async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  return res.send({ filename: req.file.filename, path: req.file.path });
};

export const uploadMultiple = async (req, res) => {
  if (!req.files || req.files.length === 0)
    return res.status(400).send("No files uploaded.");
  res.send(
    req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
    }))
  );
};
