using System.Data;
using System.Diagnostics;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using school.Models;

namespace school.Controllers;

public record struct ClassInfo(int id, string name);
public class HomeController : Controller
{
    public IDbConnection CreateConnection() => new SqliteConnection("Data Source=app.db");
    public HomeController()
    {
        using var connection = CreateConnection();
        var sql = @"
        CREATE TABLE IF NOT EXISTS classes (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT NOT NULL
        );";
        connection.Execute(sql);
        sql = "SELECT count(1) FROM classes";
        var result = connection.ExecuteScalar<int>(sql);
        if (result == 0)
        {
            sql = "insert into classes (name) VALUES (@name)";
            connection.Execute(sql, new { name = "first class"});
            sql = "insert into classes (name) VALUES (@name)";
            connection.Execute(sql, new { name = "second class"});
            
        }
    }
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
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
