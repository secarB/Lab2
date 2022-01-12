package servlets;

import point.PointEntry;
import point.Results;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException
    {
        HttpSession session = req.getSession();
        resp.setContentType("text/html;charset=UTF-8");
        Results results = (Results) session.getAttribute("results");
        if (results == null) results = new Results();

        PrintWriter pw = resp.getWriter();
        long startTime = System.nanoTime();

        try {
            double x = 0;
            double y = 0, r = 0;
            String xString, yString, rString;
            xString = req.getParameter("x").replace(",", ".");
            yString = req.getParameter("y").replace(',', '.');
            rString = req.getParameter("r").replace(",", ".");
            x = Double.parseDouble(xString);
            y = Double.parseDouble(yString);
            r = Double.parseDouble(rString);
            if (isValid(x,y,r)){
                PointEntry entry = createPoint(x, y, r, startTime);
                results.getListWithPoints().add(entry);
                System.out.println(results.getListWithPoints());
                session.setAttribute("results", results);
                pw.write(results.toJson());

            }
        } catch (NumberFormatException e) {
            pw.write("INVALID VALUES");
        } finally {
            pw.close();
        }


    }

    private PointEntry createPoint(double x,double y,double r, long startTime) {
        String exT= String.valueOf(new DecimalFormat("#0.0000").format((System.nanoTime() - startTime) / 1e9));
        return new PointEntry(x, y, r,  new SimpleDateFormat("HH:mm:ss").format(new Date()), exT,isInArea(x, y, r));
    }

    private boolean isValid(double x, double y, double r) {
        return (x > -3 && x < 3) && (y >= -5 && y <= 4) && (r > 1 && r < 4);
    }
    private boolean isInArea(double x, double y, double r){
        return checkRectangle(x, y, r) || checkTriangle(x, y, r) || checkCircle(x, y, r);

    }

    private boolean checkTriangle(double x,double y,double r){
        return x <= 0 && y >= 0 && y <= r/2 + x/2;
    }
    private boolean checkRectangle(double x,double y,double r){
        return x >= 0 && y <= 0 && y >= -r && x <= r/2;
    }
    private boolean checkCircle(double x,double y,double r){
        return x >= 0 && y >= 0 && y * y <= r * r- x * x;
    }

}
