using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Entities
{
    public class Message
    {
        
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public AppUser Sender { get; set; }                                 
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public AppUser Recipient { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.UtcNow;   
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
    }
    public static class UtcDateAnnotation       // added to fix missing Z or unformatted DateTime from Utc that is extracted from our Database
{
  private const String IsUtcAnnotation = "IsUtc";
  private static readonly ValueConverter<DateTime, DateTime> UtcConverter =
    new ValueConverter<DateTime, DateTime>(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

  private static readonly ValueConverter<DateTime?, DateTime?> UtcNullableConverter =
    new ValueConverter<DateTime?, DateTime?>(v => v, v => v == null ? v : DateTime.SpecifyKind(v.Value, DateTimeKind.Utc));

  public static PropertyBuilder<TProperty> IsUtc<TProperty>(this PropertyBuilder<TProperty> builder, Boolean isUtc = true) =>
    builder.HasAnnotation(IsUtcAnnotation, isUtc);

  public static Boolean IsUtc(this IMutableProperty property) =>
    ((Boolean?)property.FindAnnotation(IsUtcAnnotation)?.Value) ?? true;

  /// <summary>
  /// Make sure this is called after configuring all your entities.
  /// </summary>
  public static void ApplyUtcDateTimeConverter(this ModelBuilder builder)
  {
    foreach (var entityType in builder.Model.GetEntityTypes())
    {
      foreach (var property in entityType.GetProperties())
      {
        if (!property.IsUtc())
        {
          continue;
        }

        if (property.ClrType == typeof(DateTime))
        {
          property.SetValueConverter(UtcConverter);
        }

        if (property.ClrType == typeof(DateTime?))
        {
          property.SetValueConverter(UtcNullableConverter);
        }
      }
    }
  }
}                           
}