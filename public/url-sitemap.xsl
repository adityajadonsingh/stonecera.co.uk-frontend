<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; background: #f9f9f9; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 12px 20px; border: 1px solid #ddd; }
          th { background-color: #f4f4f4; }
          a { color: #007bff; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>XML Sitemap</h1>
        <table>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
          </tr>
          <xsl:for-each select="//*[local-name()='url']">
            <tr>
              <td>
                <a href="{*[local-name()='loc']}">
                  <xsl:value-of select="*[local-name()='loc']"/>
                </a>
              </td>
              <td>
                <xsl:value-of select="*[local-name()='lastmod']"/>
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
