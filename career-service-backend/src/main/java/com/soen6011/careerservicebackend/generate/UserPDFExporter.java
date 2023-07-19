package com.soen6011.careerservicebackend.generate;

import java.awt.Color;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.soen6011.careerservicebackend.model.Candidate;

public class UserPDFExporter {
    private Candidate user;

    public UserPDFExporter(Candidate user) {
        this.user = user;
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("Name", font));

        table.addCell(cell);

        cell.setPhrase(new Phrase("Education", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Experience", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Email ID", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table) {
            table.addCell(user.getFirstName() + " " + user.getLastName());
            table.addCell(user.getEducation());
            table.addCell(String.valueOf(user.getExperience() ));
            table.addCell(user.getEmailId());
    }

    public void export(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(18);
        font.setColor(Color.BLUE);

        Paragraph p = new Paragraph("Resume", font);
        p.setAlignment(Paragraph.ALIGN_CENTER);

        document.add(p);

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {1.5f, 3.5f, 3.0f, 3.0f});
        table.setSpacingBefore(10);

        writeTableHeader(table);
        writeTableData(table);

        document.add(table);

        document.close();

    }
}