using System.Data;
using System.Diagnostics;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using school.Models;

namespace school.Controllers;

public record struct ClassInfo(int id, string name);
public record struct PageInfo(int id, string name, string path);
public class HomeController : Controller
{
    public IDbConnection CreateConnection() => new SqliteConnection("Data Source=app.db");
    public HomeController()
    {
        try
        {

        using var connection = CreateConnection();
            connection.Execute(@"
            CREATE TABLE IF NOT EXISTS classes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
        );");
        connection.Execute(@"
        CREATE TABLE IF NOT EXISTS pages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            path text not null
        );");
        connection.Execute(@"
        CREATE TABLE IF NOT EXISTS countries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );");
        connection.Execute(@"
        CREATE TABLE IF NOT EXISTS families (
            id integer PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            nationality integer not null,
            mobile_no text
        );");
        connection.Execute(@"
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            family INTEGER not null,
            birth_date TEXT NOT NULL,
            gender integer not null,
            class_id integer not null
        );");
        }
        catch(Exception e)
        {
            Console.WriteLine("exception : " + e.ToString());
        }
    }
    public IActionResult Index()
    {
        return View();
    }
    public IActionResult ClassPage()
    {
        return View();
    }
    public IActionResult Privacy()
    {
        return View();
    }
    public IActionResult Pages()
    {
        return View();
    }
    public async Task<IActionResult> GetPages()
    {
        using var connection = CreateConnection();
        var sql = "SELECT id, name, path FROM pages order by id";
        var result = await connection.QueryAsync<PageInfo>(sql);
        return Ok(result);
    }
    public async Task<IActionResult> AddClass(ClassInfo classInfo)
    {
        using var connection = CreateConnection();
        var sql = "insert into classes (id, name) VALUES (@id, @name)";
        await connection.ExecuteAsync(sql, classInfo);
        return Ok();
    }
    public async Task<IActionResult> GetClasses()
    {
        using var connection = CreateConnection();
        var sql = "SELECT id, name FROM classes order by id";
        var result = await connection.QueryAsync<ClassInfo>(sql);
        return Ok(result);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
