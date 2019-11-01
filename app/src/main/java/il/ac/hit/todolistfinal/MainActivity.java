package il.ac.hit.todolistfinal;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONException;

/**
 * The TodoList program implements an application that
 * gives to user a tool to manage his tasks, create tasks,
 * edit and delete them using SQLite database.
 *
 * This app was created as a project for Mobile Application Development Course with Michael Haim
 * at Holon Institute of Technology.
 *
 * This app using HTML, CSS, jQuery, Javascript, Android WebView and SQLite DB.
 *
 * @author  Dima Tepliakov and Michael Rozentsveig
 * @version 1.0
 * @since   2019-9-15
 */

public class MainActivity extends AppCompatActivity {
    WebView browser;
    public DatabaseHandler myDB;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        myDB = new DatabaseHandler(this);

        browser = findViewById(R.id.webView);
        browser.setWebViewClient(new WebViewClient());
        browser.getSettings().setJavaScriptEnabled(true);
        browser.getSettings().getAllowUniversalAccessFromFileURLs();
        browser.setWebContentsDebuggingEnabled(true);

        browser.loadUrl("file:///android_asset/UI.html");
        browser.getSettings().setDomStorageEnabled(true);
        browser.addJavascriptInterface(new addInteraction(), "addToDb");            //add todo task
        browser.addJavascriptInterface(new getItems(), "getDataFromDB");            //get all the task list
        browser.addJavascriptInterface(new deleteInteraction(), "deleteToDoFromDb");//delete task
        browser.addJavascriptInterface(new updateInteraction(), "updateDB");        //update(edit) task
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        browser.saveState(outState);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        browser.restoreState(savedInstanceState);
    }

    @Override
    public void onBackPressed() {
        if (browser.canGoBack()) { //first check if can go back if yes then go back
            browser.goBack();
        } else {
            super.onBackPressed();
        }
    }

    public class addInteraction { //call to adding item to database function
        @JavascriptInterface
        public void addItem(String date, String name) {
            myDB.addItem(1, date, name);       //add the task to database

        }
    }

    public class getItems{ //call to get all task list from database function
        @JavascriptInterface
        public String getItems() throws JSONException {
            return myDB.getItems();
        }
    }

    public class deleteInteraction { //call to delete task from database function
        @JavascriptInterface
        public void deleteToDo(String date, String name) {
            myDB.deleteToDo(date, name);
        }
    }

    public class updateInteraction { //call to edit task from database function

        @JavascriptInterface
        public void updateToDo(String date, String name, String updateDate, String updateName) {
            //TODO add filter to filter out other accounts (user_id)
            myDB.updateToDo(date, name, updateDate, updateName);
        }
    }
}