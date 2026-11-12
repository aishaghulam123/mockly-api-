function wantsViewer(req) {
  if (req.query.format === "json") return false;
  if (req.query.format === "html") return true;
  return req.accepts(["json", "html"]) === "html";
}

function jsonViewer(req, res, next) {
  const sendJson = res.json.bind(res);

  res.json = function (body) {
    res.vary("Accept");
    if (!wantsViewer(req)) return sendJson(body);

    return res.render(
      "pages/json-viewer",
      {
        title: req.originalUrl + " - Mockly API",
        requestPath: req.originalUrl,
        statusCode: res.statusCode,
        // Compact JSON; the page lets the user switch to the pretty version
        rawJson: JSON.stringify(body)
      },
      function (error, html) {
        if (error) return sendJson(body); // fall back to plain JSON
        res.type("html").send(html);
      }
    );
  };

  next();
}

module.exports = { jsonViewer, wantsViewer };
